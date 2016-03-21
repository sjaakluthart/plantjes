var log = require('winston').loggers.get('server');
var path = require('path');
var express = require('express');
require('node-jsx').install();

var router = require('./routes.js');

// Init
var app = express();
var config = {
  port: 3000
};

// Views
app.set('views', __dirname, 'layout.ejs');
app.set('view engine', 'ejs');

// Static files
app.use(express.static('dist'));

// Router
app.use('/', router);

// Start the server
app.listen(config.port, function (err) {
  log.info('Server started; listening on port ' + config.port);
});
