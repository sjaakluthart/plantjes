// Import Node Modules
var express = require('express');
var path = require('path');
var Promise = require('bluebird');
var winston = require('winston');

// Import Routes
var plantList = require('./server/routes/plant-list.js');
var plantData = require('./server/routes/plant-data.js');
var uploadImage = require('./server/routes/upload-image.js');

// Import Functions
var db = require('./server/db.js');
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

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Send all requests to index.html so browserHistory in React Router works.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Connect to Mongo
Promise.promisify(db.connect)(url)
.then(function() {
  // Start the server
  return app.listen(config.port);
})
.then(function() {
  // Log on success
  winston.log('info', 'Connected to Mongo. Express server started, listening on port %s.', config.port);

  // Check if there are plants in the collection.
  return db.get().collection('plants').find().toArray();
})
.then(function(result) {
  // Insert plants if there are none.
  winston.log('info', 'Found %s plants in collection.', result.length);
  if (result.length === 0) {
    insertPlant();
  }
})
.catch(function(err) {
  winston.log('error', err);
});
