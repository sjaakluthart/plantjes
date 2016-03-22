var express = require('express');
var MongoClient = require('mongodb').MongoClient;
require('node-jsx').install();

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
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
    db.close();
  });
});
