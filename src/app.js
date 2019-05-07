const express = require('express');
const volleyball = require('volleyball');

const routes = require('./routes');

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

module.exports = app;
