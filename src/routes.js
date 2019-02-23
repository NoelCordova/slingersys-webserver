const express = require('express');
const api = require('./api');
const routes = express();

routes.use('/api', api);

routes.get('/', (req, res) => {
  res.json({
    url: '*/'
  });
});

routes.all('/*', (req, res) => {
  res.json({
    url: 'Ruta inválida'
  });
});


module.exports = routes;