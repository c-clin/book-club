const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const passport = require('passport');

// @route   Post api/books/add-book
// @desc    Register User
// access   Public
router.post(
  '/add-book',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { title, author, imgURL, apiID } = req.body;
    console.log(title, author, imgURL, apiID);
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
            _user: req.user.id,
            date: Date.now()
          });

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

module.exports = router;
