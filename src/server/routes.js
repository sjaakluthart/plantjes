var React = require('react');
var ReactDOMServer = require('react-dom/server');
var HomePage = require('../react/pages/home.jsx');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  var component = ReactDOMServer.renderToString(<HomePage />);

  res.render('layout', {react: component});
});

module.exports = router;
