const Post = require('../models/Schemas/Post');
const User = require('../models/Schemas/User');

exports.getAllPosts = (req, res, next) => {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => next(err));
}

exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'replies'
      }
    })
    .exec(function (err, post) {
      if (err) return next(err);

      return res.json(post);
    });
}

exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send('Missing Title');
  }

  if (!req.body.content) {
    return res.status(400).send('Missing Content');
  }


  let formatData = {
    title: req.body.title,
    content: req.body.content,
    creator: req.user._id,
    creatorName: req.user.username,
    createdAt: new Date()
  };

  let post = new Post(formatData);

  
  post.save()
  .then((post) => {
    // push the post id to the array of posts in the user
      User.findById(req.user._id)
        .then((user) => {
          user.posts.push(post._id);

          user.save();
        });

      return res.json(post);
    })
    .catch((err) => next(err));
};