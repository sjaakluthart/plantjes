const express = require('express');
const winston = require('winston');
const bcrypt = require('bcrypt');
const db = require('../db.js');

const router = express.Router();
const saltRounds = 10;

router.post('/', (req, response) => {
  // Create new user
  winston.log('info', 'Creating new user with username: %s.', req.body.username);

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // Hash password, insert user in DB
    db.get().collection('users').insert({
      username: req.body.username,
      password: hash
    }, (err, res) => {
      if (err) {
        throw err;
      }
      response.send('success!');
    });
  });
});

module.exports = router;
