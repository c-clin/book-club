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
    const { bookID, from, to, title } = req.body;

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
        title,
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

// @route   Post api/trade/accept
// @desc    On accepting trade request
// access   Private

router.post(
  '/accept',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { _id, from, to, bookID } = req.body;
    var ownerName;

    Book.findOne({ _user: from }).then(book => {
      if (book) {
        ownerName = book.ownerName;
      }
    });

    // find Trade with the id and delete it from list
    Trade.deleteOne({ _id }, (err, doc) => {
      if (err) {
        console.log(err);
      }
      res.send('trade accepted');
    });

    // find Book with the id and swap the owner
    Book.findOneAndUpdate(
      {
        _id: bookID
      },
      {
        ownerName: ownerName,
        _user: from,
        status: 'not-available'
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
  }
);

// @route   Post api/trade/requests
// @desc    Load the user's pending trade requests
// access   Private
router.post(
  '/requests',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.body;
    console.log(id);
    Trade.find({ to: id })
      .then(trade => {
        res.send(trade);
        // res.send('trade req success');
      })
      .catch(err => console.log(err));
  }
);

// @route   Post api/trade/update-trade
// @desc    Lets user update the status of their book (to trade or not)
// access   Private
router.post(
  '/update-trade',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { _user, apiID, status } = req.body;
    let newStatus = status === 'not-available' ? 'available' : 'not-available';

    console.log(_user, apiID, newStatus);
    Book.findOneAndUpdate(
      { _user, apiID },
      {
        status: newStatus
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
  }
);
