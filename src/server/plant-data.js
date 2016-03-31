var express = require('express');
var router = express.Router();
var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/plantjes';

// Send the list of plants to the client
router.get('/', function (req, res) {
  Mongo.connect(url, function (err, db) {
    console.log('Connected to server.');

    db.collection('plants').findOne({ _id: ObjectId(req.query.plantId) }, function (err, result) {
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
