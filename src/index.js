require('dotenv').config();
const { PORT } = require('./config');
const express = require('express');
const volleyball = require('volleyball');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();

require('./services/dbConnection');

// JSON parser
app.use(bodyParser.json());

// Volleyball middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(volleyball);
}

// Application routes
app.use(routes)

app.listen(PORT, () => console.log('Server now running on port: ', PORT));
