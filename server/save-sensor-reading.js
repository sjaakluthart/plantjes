const db = require('./db.js');
const objectId = require('mongodb').ObjectID;
const winston = require('winston');

const url = 'mongodb://localhost:27017/plantjes';

function saveSensorReading(plantId, sensorValue, type) {
  db.connect(url, (err) => {
    if (err) {
      winston.log('error', err);
      return false;
    }

    const selector = {
      _id: objectId(plantId)
    };
    const options = {
      $push: {
        sensorReadings: {
          type,
          value: sensorValue
        }
      }
    };

    // Find the plant's owner, send the message
    db.get().collection('plants').updateOne(selector, options,
      (err, res) => {
        if (err) {
          winston.log('error', err);
          return false;
        }

        db.close(() => {
          if (err) {
            winston.log('error', err);
          }
        });
      }
    );
  });
}

module.exports = saveSensorReading;
