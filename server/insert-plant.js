var mockPlants = require('./mock-plants.js');
var winston = require('winston');

// Function for inserting plant data, used for local development.
var insertPlant = function (db) {
  db.collection('plants').insertMany(mockPlants);

  winston.log('info', 'Inserted %s plants in the plants collection.', mockPlants.length);
};

module.exports = insertPlant;
