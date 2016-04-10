const express = require('express');
const winston = require('winston');

const db = require('../db.js');

const router = express.Router();

// Send the list of plants to the client
router.get('/', (req, response) => {
  winston.log('info', 'Finding plant list.');

  db.get().collection('plants').find(
    {},
    {
      name: 1,
      species: 1,
      plantedOn: 1
    }
  ).toArray((err, res) => {
    if (err) {
      throw err;
    }
    winston.log('info', 'Found %s plants.', res.length);
    response.send(res);
  });
});

module.exports = router;
