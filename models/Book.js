const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: [String],
  imgURL: String,
  apiID: String,
  ownerName: String,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    enum: ['available', 'not-available', 'pending'],
    default: 'not-available'
  }
});

module.exports = Book = mongoose.model('book', BookSchema);
