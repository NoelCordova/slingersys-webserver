const express = require('express');
const api = express();

const auth = require('./auth/auth');

api.use('/auth', auth);

api.get('/', (req, res) => {
  res.json({
    url: '*/api'
  });
});

module.exports = api;