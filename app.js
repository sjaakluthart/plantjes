// Import Node Modules
var express = require('express');
var Mongo = require('mongodb').MongoClient;
var winston = require('winston');

// Import Routes
var plantList = require('./server/routes/plant-list.js');
var plantData = require('./server/routes/plant-data.js');
var uploadImage = require('./server/routes/upload-image.js');

// Import Functions
var insertPlant = require('./server/insert-plant.js');

// Express setup
var app = express();

var config = {
  port: 3000
};
var url = 'mongodb://localhost:27017/plantjes';

app.use('/plant-list', plantList);
app.use('/plant', plantData);
app.use('/upload', uploadImage);

app.use(express.static('public'));

// Start the server
app.listen(config.port, function (err) {
  winston.log('info', 'Server started, listening on port %s.', config.port);
});

// Connect to Mongo and insert a plant if there are none.
Mongo.connect(url, function (err, db) {
  winston.log('info', 'Connected to server.');

  db.collection('plants').find().toArray(function (err, result) {
    if (err) {
      throw err;
    }
    winston.log('info', 'Found %s plants in collection.', result.length);
    if (result.length === 0) {
      insertPlant(db);
    }
    db.close();
    winston.log('info', 'Disconnected from server.');
  });
});
