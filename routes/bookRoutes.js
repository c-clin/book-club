const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const passport = require('passport');

// @route   Get api/books/my-list
// @desc    Load user's book list
// access   Private
router.get(
  '/my-list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Book.find({ _user: req.user.id }).then(books => res.send(books));
  }
);

// @route   Post api/books/add-book
// @desc    Add book to user's list
// access   Private
router.post(
  '/add-book',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { title, author, imgURL, apiID } = req.body;
    Book.findOne({ apiID })
      .then(book => {
        if (book) {
          res.status(400).send({ error: 'This book is already in your list!' });
        } else {
          const book = new Book({
            title,
            author,
            imgURL,
            apiID,
            _user: req.user.id
            // status: 'unavailable'
          });
          console.log(book);

          try {
            book.save();
            res.send('save success');
          } catch (err) {
            res.status(422).send(err);
          }

          console.log(book);
        }
      })
      .catch(err => console.log(err));
  }
);

// @route   Post api/books/update-trade
// @desc    Lets user update the status of their book (to trade or not)
// access   Private
router.post(
  '/update-trade',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { _user, apiID, status } = req.body;
    let newStatus = status === 'not-available' ? 'available' : 'not-available';
    res.send(_user, apiID, newStatus);

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

module.exports = router;
