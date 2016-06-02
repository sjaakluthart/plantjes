const express = require('express');
const objectId = require('mongodb').ObjectID;
const winston = require('winston');

const db = require('../db.js');

const router = express.Router();

// Send the list of plants to the client
router.get('/', (req, response) => {
  winston.log('info', 'Finding plant id:%s from plants collection.', req.query.plantId);

  const selector = {
    _id: objectId(req.query.plantId)
  };
  db.get().collection('plants').findOne(selector, (err, res) => {
    if (err) {
      throw err;
    }
    winston.log('info', 'Found plant id:%s.', req.query.plantId);
    response.send(res);
  });
});

module.exports = router;
