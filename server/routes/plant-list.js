var express = require('express');
var winston = require('winston');

var db = require('../db.js');

var router = express.Router();

// Send the list of plants to the client
router.get('/', function (req, res) {
  winston.log('info', 'Finding plant list.');

  db.get().collection('plants').find(
    {},
    {
      name: 1,
      species: 1,
      plantedOn: 1
    }
  ).toArray(function (err, result) {
    if (err) {
      throw err;
    }
    winston.log('info', 'Found %s plants.', result.length);
    res.send(result);
  });
});

module.exports = router;
