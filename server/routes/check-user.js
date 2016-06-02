const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    res.send({ authorised: true, user: req.session.user });
  } else {
    res.send({ authorised: false, user: null });
  }
});

module.exports = router;
