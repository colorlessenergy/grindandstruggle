const Post = require('../models/Schemas/Post');

exports.getAllPosts = (req, res, next) => {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => next(err));
}

exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => next(err));
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
      return res.json(post);
    })
    .catch((err) => next(err));
};