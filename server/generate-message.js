'use strict';

const db = require('./db.js');
const objectId = require('mongodb').ObjectID;
const sendEmailNotification = require('./email-notification.js');
const winston = require('winston');

const url = 'mongodb://localhost:27017/plantjes';

/* Ref values
Light: min -> 77, max -> 25, average -> 51
Moisture: min -> 30 , max -> 5, average -> 17,5
Temperature: to be determined
*/

// Generate a message based on sensor values
function generateMessage(sensorValue, referenceValues, plantName, userId) {
  let message;

  // Moisture message
  if (referenceValues.type === 'moisture') {
    // Regular values
    // Bit dry
    if (sensorValue >= 20) {
      message = `Je plantje ${plantName} heeft een beetje dorst! Geef ${plantName} wat te drinken.`;
    }
    // Less extreme values
    // Quite dry
    if (sensorValue >= 25) {
      message = `Je plantje ${plantName} heeft erg veel dorst! Geef ${plantName} snel wat te drinken.`;
    }
    // Quite moist
    if (sensorValue <= 10) {
      message = `Je plantje ${plantName} heeft een beetje te veel gedronken! Geef ${plantName} even niet te drinken.`;
    }
    // Extreme values
    // Extremely dry
    if (sensorValue >= referenceValues.min) {
      message = `Je plantje ${plantName} staat helemaal droog! Geef ${plantName} nu wat te drinken!`;
    }
    // Extremely moist
    if (sensorValue <= referenceValues.max) {
      message = `Je plantje ${plantName} staat helemaal onder water! Geef ${plantName} voorlopig geen water!`;
    }
  }

  // Light message
  if (referenceValues.type === 'light') {
    // Less extreme values
    // Quite dark
    if (sensorValue >= 65) {
      message = `Je plantje ${plantName} staat erg donker! Zet ${plantName} op een zonniger plekje.`;
    }
    // Quite light
    if (sensorValue <= 35) {
      message = `Je plantje ${plantName} heeft een het een beetje warm! Laat ${plantName} even afkoelen in de schaduw.`;
    }
    // Extreme values
    // Extremely dark
    if (sensorValue >= referenceValues.min) {
      message = `Je plantje ${plantName} staat helemaal in het donker! Geef ${plantName} wat zonlicht!`;
    }
    // Extremely light
    if (sensorValue <= referenceValues.max) {
      message = `Je plantje ${plantName} staat vol te branden in de zon! Geef ${plantName} snel wat verkoeling in de schaduw!`;
    }
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
        db.close(() => {
          if (err) {
            winston.log('error', err);
          }
        });
      }
    );
  });
}

module.exports = generateMessage;
