var mockPlants = require('./mock-plants.js');

// Function for inserting plant data, used for local development.
var insertPlant = function(db) {
  db.collection('plants').insertMany(mockPlants);

  console.log('Inserted ' + mockPlants.length + ' plants in the plants collection.');
}

module.exports = insertPlant;
