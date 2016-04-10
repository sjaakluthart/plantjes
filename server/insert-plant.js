const mockPlants = require('./mock-plants.js');
const winston = require('winston');

const db = require('./db.js');

// Function for inserting plant data, used for local development.
const insertPlant = () => {
  db.get().collection('plants').insertMany(mockPlants);

  winston.log('info', 'Inserted %s plants in the plants collection.', mockPlants.length);
};

module.exports = insertPlant;
