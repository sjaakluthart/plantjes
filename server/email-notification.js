const email = require('emailjs');
const settings = require('../settings.json');
const winston = require('winston');

const server 	= email.server.connect({
  user: settings.user,
  password: settings.password,
  host: settings.host
});

function sendEmailNotification(notification, name, emailAddress) {
  server.send({
    text: notification,
    from: `Plant Buddy <${settings.user}>`,
    to: `${name} <${emailAddress}>`,
    subject: 'Je plantje heeft je aandacht nodig!'
  }, (err, message) => {
    winston.log('info', err || message);
  });
}

module.exports = sendEmailNotification;
