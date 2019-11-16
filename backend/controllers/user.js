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