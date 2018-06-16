const mongoose = require('mongoose');
const Schema = mongoose.Schema;=

const BookSchema = new Schema({
    title: String,
    author: [String],
    imgURL: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})