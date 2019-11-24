const Comment = require('../models/Schemas/Comment');
const Post = require('../models/Schemas/Post');


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
    .then((comment) => {
      Post.findById(req.params.id)
        .then((post) => {
          // push comment to post 
          // to be able to get all comments easily

          post.comments.push(comment._id);

          post.save()
            .then((post) => res.json(comment))
            .catch((err) => next(err));
        })
        .catch(err => next(err));
    })
    .catch((err) => next(err));
}