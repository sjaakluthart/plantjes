var log = require('winston').loggers.get('server');
var path = require('path');
var express = require('express');
require('node-jsx').install();

var app = express();

var config = {
  port: 3000
};

// views
app.set('views', __dirname, 'layout.ejs');
app.set('view engine', 'ejs');

var router = require('./routes.js');
app.use('/', router);

// start the server
app.listen(config.port, function (err) {
  log.info('Server started; listening on port ' + config.port);
});
