const express = require('express');
const auth = express();

const authRoutes = require('./auth');

auth.use(authRoutes);

auth.get('/', (req, res) => {
  res.json({
    url: '*/api/v1/auth',
    api_version: 1
  });
});

auth.get('/', (req, res) => {
  res.json({
    url: '*/'
  });
});

auth.all('/*', (req, res) => {
  res.json({
    url: 'Ruta inválida'
  });
});


module.exports = auth;