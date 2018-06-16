const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: [String],
  imgURL: String,
  apiID: String,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: Date
});

module.exports = Book = mongoose.model('book', BookSchema);
