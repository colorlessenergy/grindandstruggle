const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  creatorUsername: {
    type: String
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;