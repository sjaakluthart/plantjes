var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/plantjes';

// Test route for getting data in React component
router.get('/plant', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected to server.');

    db.collection('plants').find().toArray(function(err, result) {
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
