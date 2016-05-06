'use strict';

const db = require('./db.js');
const objectId = require('mongodb').ObjectID;
const sendEmailNotification = require('./email-notification.js');
const winston = require('winston');

const url = 'mongodb://localhost:27017/plantjes';

// Generate a message based on sensor values
function generateMessage(sensorValue, referenceValues, plantName, userId) {
  let message;

  // Moisture message
  if (referenceValues.type === 'moisture') {
    message = 'vocht bericht';
  }

  // Light message
  if (referenceValues.type === 'light') {
    message = 'licht bericht';
  }

  // Connect to db
  db.connect(url, (err) => {
    if (err) {
      winston.log('error', err);
      return false;
    }

    // Find the plant's owner, send the message
    db.get().collection('users').findOne(
      { _id: objectId(userId) },
      (err, res) => {
        if (err) {
          winston.log('error', err);
          return false;
        }

        sendEmailNotification(message, res.username, res.email);
        db.close();
      }
    );
  });
}

module.exports = generateMessage;
