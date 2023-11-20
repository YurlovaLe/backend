const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  autor: {
    type: String,
    required: true,
    minlength: 2,
  },
  release_year: {
    type: Number,
    required: true,
    minlength: 4,
}, });

module.exports = mongoose.model('book', bookSchema);