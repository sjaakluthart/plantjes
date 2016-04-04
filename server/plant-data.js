var express = require('express');
var router = express.Router();
var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var winston = require('winston');

var url = 'mongodb://localhost:27017/plantjes';

// Send the list of plants to the client
router.get('/', function (req, res) {
  Mongo.connect(url, function (err, db) {
    winston.log('info', 'Connected to server, finding plant id:%s from plants collection.', req.query.plantId);

    db.collection('plants').findOne( { _id: ObjectId(req.query.plantId) }, function (err, result) {
      if (err) {
        throw err;
      }
      winston.log('info', 'Found plant id:%s.', req.query.plantId);
      res.send(result);
      db.close();
      winston.log('info', 'Disonnected from server.');
    });
  });
});

module.exports = router;
