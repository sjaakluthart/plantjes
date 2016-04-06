var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var winston = require('winston');

var db = require('../db.js');

var router = express.Router();

// Send the list of plants to the client
router.get('/', function (req, res) {
  winston.log('info', 'Finding plant id:%s from plants collection.', req.query.plantId);

  db.get().collection('plants').findOne( { _id: ObjectId(req.query.plantId) }, function (err, result) {
    if (err) {
      throw err;
    }
    winston.log('info', 'Found plant id:%s.', req.query.plantId);
    res.send(result);
  });
});

module.exports = router;
