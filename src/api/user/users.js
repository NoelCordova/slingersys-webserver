const express = require('express');
const { handleError } = require('../../services/utils');
const {
  validateTokenExpiration,
  validateTokenRole,
  validateUserAdmin,
  validateTokenIdentity
} = require('../../middlewares/validators');
const User = require('../../models/User');
const app = express();

app.get('/', [validateTokenExpiration, validateTokenRole], (req, res) => {
  let skip = req.query.skip;
  let limit = req.query.limit;

  skip && !isNaN(parseInt(skip)) ? skip = parseInt(skip) : skip = 0;
  limit && !isNaN(limit) ? limit = parseInt(limit) : limit = 10;
  
  User.find({ active: true }).skip(skip).limit(limit)
    .then(usersDb => {
      res.json({
        ok: true,
        message: 'Success',
        skip,
        limit,
        total: usersDb.length,
        data: [...usersDb]
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg));
});

app.get('/:email', [validateTokenExpiration, validateTokenRole], (req, res) => {
  const email = req.params.email;

  User.findOne({ email, active: true })
    .then(userDb => {
      if (userDb === null) return handleError(res, 400, 'Usuario no encontrado');
      const data = userDb;

      res.json({
        ok: true,
        message: 'Success',
        data
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg));
});

app.put('/:email', [validateTokenExpiration, validateTokenRole, validateUserAdmin], (req, res) => {
  const email = req.params.email;


  res.json({a: 'asd'})
});

module.exports = app;