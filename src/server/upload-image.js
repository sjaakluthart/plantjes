var express = require('express');
var multer = require('multer');
var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();
var upload = multer({ dest: 'dist/uploads/' });

var url = 'mongodb://localhost:27017/plantjes';

router.post('/', upload.single('file'), function (req, res) {
  // Update the Plant with a new image, send the image name to the client on success.
  Mongo.connect(url, function (err, db) {
    db.collection('plants').updateOne({ _id: ObjectId(req.body.plantId) }, { $set: { plantPicture: req.file.filename } }, function (err, result) {
      if (err) {
        throw err;
      }
      res.send(req.file.filename);
      db.close();
    });
  });
});

module.exports = router;
