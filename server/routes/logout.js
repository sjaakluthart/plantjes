const express = require('express');
const winston = require('winston');

const router = express.Router();

router.post('/', (req, response) => {
  // Destroy the session
  req.session.destroy();
  winston.log('info', 'Destoyed session, logged user: %s out.', req.body.username);

  return response.send('success');
});

module.exports = router;
