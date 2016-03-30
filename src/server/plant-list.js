var express = require('express');
var router = express.Router();
var Mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/plantjes';

// Send the list of plants to the client
router.get('/', function(req, res) {
  Mongo.connect(url, function(err, db) {
    console.log('Connected to server.');

    db.collection('plants').find({}, {name: 1, species: 1, plantedOn: 1}).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send(result);
      db.close();
      console.log('Disonnected from server.');
    });
  });
});

module.exports = router;
