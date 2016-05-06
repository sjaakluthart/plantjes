'use strict';

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

    let options;
    const selector = {
      _id: objectId(plantId)
    };

    // quick and dirty :)
    if (type === 'light') {
      options = { $set: { 'sensorReadings.light': sensorValue } };
    }
    if (type === 'moisture') {
      options = { $set: { 'sensorReadings.moisture': sensorValue } };
    }
    if (type === 'temperature') {
      options = { $set: { 'sensorReadings.temperature': sensorValue } };
    }

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
