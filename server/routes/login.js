const express = require('express');
const winston = require('winston');
const bcrypt = require('bcrypt');
const db = require('../db.js');

const router = express.Router();

router.post('/', (req, response) => {
  // Create new user
  winston.log('info', 'Authentication user with username: %s.', req.body.username);

  db.get().collection('users').findOne({ username: req.body.username }, (err, user) => {
    if (err) { response.send(err); }
    if (!user) {
      return response.send({ error: 'Incorrect username.' });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return response.send({ error: 'Incorrect password.' });
    }

    req.session.user = {
      _id: user._id,
      username: user.username
    };

    return response.send('authorised');
  });
});

module.exports = router;
