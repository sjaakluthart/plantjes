var express = require('express');
var router = express.Router();
var Mongo = require('mongodb').MongoClient;
var winston = require('winston');

var url = 'mongodb://localhost:27017/plantjes';

// Send the list of plants to the client
router.get('/', function (req, res) {
  Mongo.connect(url, function (err, db) {
    winston.log('info', 'Connected to server, finding plant list.');

    db.collection('plants').find({}, { name: 1, species: 1, plantedOn: 1 }).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      winston.log('info', 'Found %s plants.', result.length);
      res.send(result);
      db.close();
      winston.log('info', 'Disonnected from server.');
    });
  });
});

module.exports = router;
