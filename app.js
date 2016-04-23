// Import Node Modules
const express = require('express');
const path = require('path');
const session = require('express-session');
const settings = require('./settings.json');
const uuid = require('uuid');
const winston = require('winston');
const bodyParser = require('body-parser');

// Import Routes
const plantList = require('./server/routes/plant-list.js');
const plantData = require('./server/routes/plant-data.js');
const uploadImage = require('./server/routes/upload-image.js');
const createUser = require('./server/routes/create-user.js');
const logIn = require('./server/routes/login.js');
const checkUser = require('./server/routes/check-user.js');

// Import Functions
const db = require('./server/db.js');
const insertPlant = require('./server/insert-plant.js');

// Express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
  port: 3000
};
const url = 'mongodb://localhost:27017/plantjes';

app.use(session({
  genid() {
    return uuid.v1();
  },
  resave: false,
  saveUninitialized: true,
  secret: settings.secret
}));

app.use('/plant-list', plantList);
app.use('/plant', plantData);
app.use('/upload', uploadImage);
app.use('/create-user', createUser);
app.use('/log-in', logIn);
app.use('/check-user', checkUser);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Send all requests to index.html so browserHistory in React Router works.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

db.connect(url, (err) => {
  if (err) {
    winston.log('error', err);
    return false;
  }

  app.listen(config.port);
  winston.log(
    'info',
    'Connected to Mongo. Express server started, listening on port %s.',
    config.port
  );

  db.get().collection('plants').find().toArray((err, res) => {
    // Insert plants if there are none.
    winston.log('info', 'Found %s plants in collection.', res.length);
    if (res.length === 0) {
      insertPlant();
    }
  });
});
