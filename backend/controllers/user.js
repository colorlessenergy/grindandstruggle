const User = require('../models/Schemas/User');

exports.registerUser = (req, res, next) => {
  const user = new User(req.body);

  user.save()
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.status(400).send('Email or Username already registered');
      }

      return res.status(400).send(err);
    });
}

/**
 * returns a json object of the user with all the post
 * populated
 * 
 */

exports.getUserPosts = (req, res, next) => {
  User.findById(req.user._id)
    .populate('posts')
    .exec((err, posts) => {
      if (err) return next(err);

      return res.json(posts);
    })
}