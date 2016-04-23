const email = require('emailjs');
const settings = require('../settings.json');
const winston = require('winston');

const server 	= email.server.connect({
  user: settings.user,
  password: settings.password,
  host: settings.host
});

server.send({
  text: 'test email',
  from: 'Plantjes <mail@sjaakluthart.nl>"',
  to: 'Henk <sjaakluthart@gmail.com>',
  subject: 'email test'
}, (err, message) => {
  winston.log('info', err || message);
});
