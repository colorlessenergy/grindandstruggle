const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  reply: {
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
  },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;