var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Layout = require('../react/layout.jsx');
var HomePage = require('../react/pages/home.jsx');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  var component = ReactDOMServer.renderToString(<Layout><HomePage /></Layout>);

  res.render('layout', {react: component});
});

module.exports = router;
