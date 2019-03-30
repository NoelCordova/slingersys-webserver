const express = require('express');
const api = express();

// Routes
const auth = require('./auth/auth');
const users = require('./user/users');

api.use('/auth', auth);
api.use('/users', users);

api.get('/', (req, res) => {
  res.json({
    url: '*/api'
  });
});


module.exports = api;