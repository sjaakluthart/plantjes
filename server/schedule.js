const db = require('./db.js');
const schedule = require('node-schedule');
const readSensor = require('./sensor.js');
const winston = require('winston');

const url = 'mongodb://localhost:27017/plantjes';

winston.log('info', 'Starting schedule every 10 secs');

db.connect(url, (err) => {
  if (err) {
    winston.log('error', err);
    return false;
  }

  // Module from https://www.npmjs.com/package/node-schedule
  schedule.scheduleJob('*/10 * * * * *', () => {
    winston.log('info', 'I get called every 10 seconds!');
    // Find all plants in the collection
    // Connect to the Raspberry Pi, read sensor value
    // Save sensor value in DB for each plants
    // Decide if the plant needs attention
    // Send message if attention is needed
    db.get().collection('plants').findOne(
      { species: 'sla' },
      (err, res) => {
        if (err) {
          throw err;
        }
        winston.log('info', 'Found plant species: %s.', 'sla');
        winston.log('info', res.sensors.moisture, res.referenceValues.moisture);
        readSensor(res.sensors.moisture, res.referenceValues.moisture);
      }
    );
  });
});
