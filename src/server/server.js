// Import Node Modules
const express = require('express');
const Mongo = require('mongodb').MongoClient;

// Import Routes
var plantList = require('./plant-list.js');
var plantData = require('./plant-data.js');
var uploadImage = require('./upload-image.js');

// Import Functions
var insertPlant = require('./insert-plant.js');

// Express setup
var app = express();

var config = {
  port: 3000
};
var url = 'mongodb://localhost:27017/plantjes';

app.use('/plant-list', plantList);
app.use('/plant', plantData);
app.use('/upload', uploadImage);

app.use(express.static('dist'));

// Start the server
app.listen(config.port, function (err) {
  console.log('Server started; listening on port ' + config.port);
});

// Connect to Mongo and insert a plant if there are none.
Mongo.connect(url, function (err, db) {
  console.log('Connected to server.');

  db.collection('plants').find().toArray(function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result.length + ' plant');
    if (result.length === 0) {
      insertPlant(db);
    }
    db.close();
    console.log('Disonnected from server.');
  });
});
