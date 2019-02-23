const express = require('express');
const v1 = require('./v1');
const api = express();

api.use('/v1', v1);

api.get('/', (req, res) => {
  res.json({
    url: '*/api'
  });
});

api.all('/*', (req, res) => {
  res.json({
    url: 'Ruta inválida'
  });
});


module.exports = api;