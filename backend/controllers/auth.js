const User = require('../models/Schemas/User');
const jwt = require('jsonwebtoken');
const config = require('../models/config/config');

exports.loginUser = (req, res, next) => {
  // validate the data given
  if (!req.body.email) {
    return res.status(400).send('Missing Email');
  }

  if (!req.body.password) {
    return res.status(400).send('Missing Password');
  }

  // find the user in the DB

  User.findOne({ email: req.body.email })
    .then((user) => {
      // compare password provided with the password in db

      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          return next(err);
        }

        if (!isMatch) {
          return res.status(400).send('incorrect password');
        }

        // create JWT token and store it on the user in the DB
        let payload = {
          _id: user._id
        }


        let token = jwt.sign(payload, config.secret);

        user.token = token; 

        user.save()
          .then(function () {
            return res.json({ token: token });
          })
          .catch(function (err) {
            return next(err)
          })

      });
    })
    .catch((err) => {
      return next(err)
    });
};

exports.validateToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('this endpoint requires a token');
  }

  try {
    var decoded = jwt.verify(token, config.secret);
  } catch (err) {
    return res.status(403).send('failed to authenticate token');
  }


  User.findById(decoded._id)
    .then((user) => {
      if (!user) {
        return res.status(403).send('Invalid User');
      }

      if (token !== user.token) {
        return res.status(403).send('Expired Token');
      }

      next();
    })
    .catch((err) => {
      return next(err);
    })
}