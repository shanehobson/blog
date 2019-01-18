const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    type: String,
    title: String,
    author: String,
    date: String,
    imageUrl: String,
    imageSubtitle: String,
    elements: []
  });

  module.exports = mongoose.model('Post', PostSchema);