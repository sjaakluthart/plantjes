var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Layout = require('../react/layout.jsx');
var HomePage = require('../react/pages/home.jsx');

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res) {
  var component = ReactDOMServer.renderToString(<Layout><HomePage /></Layout>);

  res.render('layout', {react: component});
});

var url = 'mongodb://localhost:27017/plantjes';

// Test route for getting data in React component
router.get('/test', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected to server.');

    db.collection('documents').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

module.exports = router;
