const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  creatorName: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;