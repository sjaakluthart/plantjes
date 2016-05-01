const db = require('../db.js');
const express = require('express');
const moment = require('moment');
const winston = require('winston');

const router = express.Router();

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
    referenceValues: {
      temperature: {
        min: 7,
        max: 24
      },
      moisture: {
        min: 60,
        max: 10
      },
      light: {
        min: 7,
        max: 24
      }
    },
    sensorReadings: [
      {
        moisture: 8,
        temperature: 5,
        humidity: 12,
        light: 16,
        readingTakenOn: moment().subtract(10, 'hours').toDate()
      },
      {
        moisture: 9,
        temperature: 3,
        humidity: 17,
        light: 7,
        readingTakenOn: moment().subtract(5, 'hours').toDate()
      },
      {
        moisture: 3,
        temperature: 10,
        humidity: 22,
        light: 12,
        readingTakenOn: moment().subtract(1, 'hours').toDate()
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
