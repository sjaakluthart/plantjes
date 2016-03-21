var React = require('react');
var ReactDOMServer = require('react-dom/server');
var HomePage = require('../react/pages/home.jsx');

var component = ReactDOMServer.renderToString(<HomePage />);

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send(component);
});

module.exports = router;
