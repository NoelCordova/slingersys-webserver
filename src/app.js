const express = require('express');
const volleyball = require('volleyball');

const routes = require('./routes');
const { errorHandler, notFound } = require('./middlewares/routes-handlers');

// Database connection
require('./services/dbConnection');

// Initialize server
const app = express();

// App middleware
app.use(express.json());
app.use(volleyball);

// Routes
app.get('/', (req, res) => res.json({ message: 'Mensaje para ver las rutas de ayuda...' }));
app.use(routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
