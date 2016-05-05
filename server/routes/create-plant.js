const db = require('../db.js');
const express = require('express');
const moment = require('moment');
const winston = require('winston');

const router = express.Router();

/* Ref values
Light: min -> 77, max -> 25
Moisture: min -> 30 , max -> 5
Temperature: to be determined
*/
router.post('/', (req, response) => {
  // Create new user
  winston.log('info', 'Creating new plant for user: %s.', req.body.userId);

  // Insert user in DB with hashed password
  db.get().collection('plants').insert({
    forUserId: req.body.userId,
    species: req.body.species,
    name: req.body.name,
    plantedOn: req.body.plantedOn,
    harvestOn: moment(new Date(req.body.plantedOn)).add(5, 'weeks').toDate(),
    sensors: {
      moisture: req.body.moisture,
      light: req.body.light,
      temperture: req.body.temperture
    },
    referenceValues: [
      {
        type: 'temperture',
        min: 7,
        max: 24
      },
      {
        type: 'moisture',
        min: 30,
        max: 5
      },
      {
        type: 'light',
        min: 77,
        max: 25
      }
    ],
    sensorReadings: [
      {
        moisture: 10,
        temperature: 5,
        light: 16,
        readingTakenOn: moment().subtract(10, 'hours').toDate()
      }
    ]
  }, (err, res) => {
    if (err) {
      throw err;
    }

    response.send(res);
  });
});

module.exports = router;
