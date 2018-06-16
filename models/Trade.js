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
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  date: Date
});

module.exports = Trade = mongoose.model('trade', TradeSchema);
