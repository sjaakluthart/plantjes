const express = require('express');
const winston = require('winston');
const objectId = require('mongodb').ObjectID;
const db = require('../db.js');

const router = express.Router();

router.post('/', (req, response) => {
  // Create new user
  winston.log('info', 'OnBoarding user with id: %s.', req.body.userId);

  db.get().collection('users').updateOne(
    { _id: objectId(req.body.userId) },
    { $set: { onBoard: true, email: req.body.email } },
    (err) => {
      if (err) {
        throw err;
      }
      winston.log(
        'info',
        'Onboarded user with id: %s, added email: %s',
        req.body.userId,
        req.body.email
      );
      req.session.user.onBoard = true;
      response.send('success');
    }
  );
});

module.exports = router;
