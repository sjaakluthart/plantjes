const bcrypt = require('bcrypt');
const db = require('../db.js');
const express = require('express');
const winston = require('winston');

const router = express.Router();
const saltRounds = 10;

router.post('/', (req, response) => {
  // Create new user
  winston.log('info', 'Creating new user with username: %s.', req.body.username);

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // Insert user in DB with hashed password
    const options = {
      username: req.body.username,
      email: req.body.email,
      password: hash
    };
    db.get().collection('users').insert(options, (err, res) => {
      if (err) {
        throw err;
      }

      req.session.user = {
        _id: res.ops[0]._id.toString(),
        username: res.ops[0].username
      };

      response.send(res);
    });
  });
});

module.exports = router;
