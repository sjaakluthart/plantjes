const db = require('./db.js');
const schedule = require('node-schedule');
const readSensor = require('./sensor.js');
const winston = require('winston');

const url = 'mongodb://localhost:27017/plantjes';

winston.log('info', 'Starting schedule every 5 secs');

db.connect(url, (err) => {
  if (err) {
    winston.log('error', err);
    return false;
  }

  // Module from https://www.npmjs.com/package/node-schedule
  schedule.scheduleJob('*/5 * * * * *', () => {
    winston.log('info', 'I get called every 5 seconds!');
    // Find all plants in the collection
    // Connect to the Raspberry Pi, read sensor value
    // Save sensor value in DB for each plants
    // Decide if the plant needs attention
    // Send message if attention is needed
    db.get().collection('plants').findOne(
      {},
      (err, res) => {
        if (err) {
          throw err;
        }
        winston.log('info', 'Found plant species: %s.', res.species);
        winston.log('info', res.sensors, res.referenceValues);
        winston.log('info', 'moisture channel %s', res.sensors.moisture);
        winston.log('info', 'light channel %s', res.sensors.light);
        winston.log('info', 'temperature channel %s', res.sensors.temperture);

        readSensor(res.sensors.moisture, res.referenceValues.moisture);

        setTimeout(() => {
          readSensor(res.sensors.light, res.referenceValues.light);
        }, 3000);

        // setTimeout(() => {
        //   readSensor(2)
        // }, 6000);
        // readSensor(res.sensors.moisture, res.referenceValues.moisture);
      }
    );
  });
});
