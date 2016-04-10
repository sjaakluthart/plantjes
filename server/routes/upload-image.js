const express = require('express');
const multer = require('multer');
const objectId = require('mongodb').ObjectID;
const winston = require('winston');

const db = require('../db.js');

const router = express.Router();
const upload = multer({ dest: './public/uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  // Update the Plant with a new image, send the image name to the client on success.
  winston.log('info', 'Updating image for plant id:%s.', req.body.plantId);
  db.get().collection('plants').updateOne(
    { _id: objectId(req.body.plantId) },
    { $set: { plantPicture: req.file.filename } },
    (err) => {
      if (err) {
        throw err;
      }
      winston.log(
        'info',
        'Set plant id:%s plantPicture to %s.',
        req.body.plantId,
        req.file.filename
      );
      res.send(req.file.filename);
    }
  );
});

module.exports = router;
