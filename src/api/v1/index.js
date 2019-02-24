const express = require('express');
const bodyParser = require('body-parser');
const v1 = express();

v1.use(bodyParser.json());

const auth = require('./auth');

v1.use('/auth', auth);

v1.get('/', (req, res) => {
  res.json({
    url: '*/api/v1',
    api_version: 1
  });
});

v1.get('/', (req, res) => {
  res.json({
    url: '*/'
  });
});

v1.all('/*', (req, res) => {
  res.json({
    url: 'Ruta inválida'
  });
});


module.exports = v1;