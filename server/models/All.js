const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({});

  module.exports = mongoose.model('All', PostSchema);