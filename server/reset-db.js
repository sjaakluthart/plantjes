const db = require('./db.js');
const winston = require('winston');

const url = 'mongodb://localhost:27017/plantjes';

db.connect(url, (err) => {
  if (err) {
    winston.log('error', err);
    return false;
  }

  // Nasty :D
  db.get().collection('users').remove(() => {
    db.get().collection('plants').remove(() => {
      process.exit();
    });
  });
});
