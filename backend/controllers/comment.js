const Comment = require('../models/Schemas/Comment');


exports.getAllComments = (req, res, next) => {
  Comment.find({})
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
}

exports.createComment = (req, res, next) => {
  if (!req.body.comment) {
    return res.status(400).send('Missing Comment')
  }

  const formatData = {
    comment: req.body.comment,
    creatorId: req.user._id,
    creatorUsername: req.user.username
  }

  let comment = new Comment(formatData);

  comment.save()
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
}