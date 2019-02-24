const express = require('express');
const { validateEmail } = require('../../../middlewares/validators');
const app = express();

app.post('/login', [validateEmail], (req, res) => {

  res.json({
    ok: true,
    message: ''
  });
});


module.exports = app;