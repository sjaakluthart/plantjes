var express = require('express');
var multer = require('multer');
var ObjectId = require('mongodb').ObjectID;
var winston = require('winston');

var db = require('../db.js');

var router = express.Router();
var upload = multer({ dest: './public/uploads/' });

router.post('/', upload.single('file'), function (req, res) {
  // Update the Plant with a new image, send the image name to the client on success.
  winston.log('info', 'Updating image for plant id:%s.', req.body.plantId);
  db.get().collection('plants').updateOne({ _id: ObjectId(req.body.plantId) }, { $set: { plantPicture: req.file.filename } }, function (err, result) {
    if (err) {
      throw err;
    }
    winston.log('info', 'Set plant id:%s plantPicture to %s.', req.body.plantId, req.file.filename);
    res.send(req.file.filename);
  });
});

module.exports = router;
