const schedule = require('node-schedule');
const readSensor = require('./sensor.js');
const winston = require('winston');

// TODO check the user's plant data every hour or so, send message if their plant requires
// attention

winston.log('info', 'Starting schedule every 2secs');

// Module from https://www.npmjs.com/package/node-schedule
schedule.scheduleJob('*/10 * * * * *', () => {
  winston.log('info', 'I get called every 10 seconds!');
  readSensor(0);
  // Find all plants in the collection
  // Connect to the Raspberry Pi, read sensor value
  // Save sensor value in DB for each plants
  // Decide if the plant needs attention
  // Send message if attention is needed
});
