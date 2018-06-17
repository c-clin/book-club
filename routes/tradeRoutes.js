const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Book = require('../models/Book');
const Trade = require('../models/Trade');

// @route   Get api/trade/available-books
// @desc    Load all books for trade
// access   Public
router.get('/available-books', (req, res) => {
  Book.find({ status: { $ne: 'not-available' } }).then(books =>
    res.send(books)
  );
});

module.exports = router;

// @route   Post api/trade/trade-request
// @desc    Sends a trade request to another user
// access   Private
router.post(
  '/trade-request',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { bookID, from, to } = req.body;

    // if (to === from) {
    //   res.status(400).send({ err: 'You cannot trade with yourself.' });
    // }
    // test

    Book.findOneAndUpdate(
      {
        _user: to,
        _id: bookID
      },
      {
        status: 'pending'
      },
      {
        returnNewDocument: true
      },
      function(err, doc) {
        if (err) {
          console.log(err);
        }
        console.log(doc);
      }
    );

    Trade.findOne({ book: bookID, to }).then(trade => {
      if (trade) {
        res
          .status(400)
          .send({ error: 'This Book is on hold with another user!' });
      }
      const tradeRequest = new Trade({
        book: bookID,
        from,
        to,
        date: Date.now()
      });
      console.log('new trade req: ' + tradeRequest);

      try {
        tradeRequest.save();
        res.send('trade success');
      } catch (err) {
        res.status(422).send(err);
      }
    });
  }
);
