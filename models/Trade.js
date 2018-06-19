const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  from_name: String,
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to_name: String,
  title: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  date: Date
});

module.exports = Trade = mongoose.model('trade', TradeSchema);
