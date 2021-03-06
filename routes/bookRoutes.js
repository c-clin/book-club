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
    const { title, author, imgURL, apiID, ownerName, link } = req.body;
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
            ownerName,
            link,
            _user: req.user.id
          });
          try {
            book.save();
            res.send('save success');
          } catch (err) {
            res.status(422).send(err);
          }
        }
      })
      .catch(err => console.log(err));
  }
);

// @route   Post api/books/delete-book
// @desc    Delete book from user's list
// access   Private
router.post(
  '/delete-book',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { bookID } = req.body;
    Book.deleteOne({ _id: bookID }, (err, doc) => {
      if (err) console.log(err);
      Trade.deleteOne({ book: bookID }, (err, doc) => {
        if (err) console.log(err);
        res.send('delete both success');
      });
    });
  }
);

module.exports = router;
