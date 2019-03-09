const express = require('express');
const volleyball = require('volleyball');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// Volleyball middleware
app.use(volleyball);

// Routes middleware
app.use(routes);


module.exports = app;