const { PORT } = require("./config");
require("./services/dbConnection");

const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();

// JSON parser
app.use(bodyParser.json());

// Volleyball middleware
if (process.env.NODE_ENV !== "production") {
  const volleyball = require("volleyball");
  app.use(volleyball);
}

// Application routes
app.use(routes);

// Server starts
app.listen(PORT, () => console.log("Server now running on port: ", PORT));
