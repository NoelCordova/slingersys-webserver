const express = require('express');
const { handleError } = require('../../services/utils');
const { validateTokenExpiration, validateTokenRole } = require('../../middlewares/validators');
const User = require('../../models/User');
const app = express();

app.get('/', [validateTokenExpiration, validateTokenRole], (req, res) => {
  User.find({ active: true })
    .then(usersDb => {
      res.json({
        ok: true,
        message: 'Success',
        data: [...usersDb]
      });
    })
    .catch(error => handleError(res, undefined, error));
});


module.exports = app;