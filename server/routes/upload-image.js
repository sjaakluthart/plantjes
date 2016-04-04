var express = require('express');
var multer = require('multer');
var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var winston = require('winston');

var router = express.Router();
var upload = multer({ dest: './public/uploads/' });

var url = 'mongodb://localhost:27017/plantjes';

router.post('/', upload.single('file'), function (req, res) {
  // Update the Plant with a new image, send the image name to the client on success.
  winston.log('info', 'Connected to server updating image for plant id:%s.', req.body.plantId);
  Mongo.connect(url, function (err, db) {
    db.collection('plants').updateOne({ _id: ObjectId(req.body.plantId) }, { $set: { plantPicture: req.file.filename } }, function (err, result) {
      if (err) {
        throw err;
      }
      winston.log('info', 'Set plant id:%s plantPicture to %s.', req.body.plantId, req.file.filename);
      res.send(req.file.filename);
      db.close();
      winston.log('info', 'Disonnected from server.');
    });
  });
});

module.exports = router;
