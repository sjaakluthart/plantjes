var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');

var router = require('./routes.js');

// Init
var app = express();
var config = {
  port: 3000
};
var url = 'mongodb://localhost:27017/plantjes';

// Views
app.set('views', __dirname, 'layout.ejs');
app.set('view engine', 'ejs');

// Static files
app.use(express.static('dist'));

// Router
app.use('/', router);

// Start the server
app.listen(config.port, function (err) {
  console.log('Server started; listening on port ' + config.port);
});

var insertDocuments = function(db, callback) {
  // Get the plants collection
  var collection = db.collection('plants');
  // Insert some documents
  collection.insert({
    species: 'sla',
    name: 'sjon',
    plantedOn: moment().subtract(3, 'days').toDate(),
    harvestOn: moment().add(5, 'weeks').toDate(),
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
  });

  console.log('Inserted plant in the plants collection.');
}

// Connect to Mongo and insert a plant if there are none.
MongoClient.connect(url, function(err, db) {
  console.log('Connected to server.');

  db.collection('plants').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result.length + ' plant');
    if (result.length === 0) {
      insertDocuments(db);
    }
    db.close();
    console.log('Disonnected from server.');
  });
});
