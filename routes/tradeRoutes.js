const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const passport = require('passport');

// @route   Get api/trade/available-books
// @desc    Load all books for trade
// access   Public
router.get('/available-books', (req, res) => {
  Book.find({ status: 'available' }).then(books => res.send(books));
});

module.exports = router;
