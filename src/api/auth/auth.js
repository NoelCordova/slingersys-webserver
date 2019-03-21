const express = require('express');
const { handleError } = require('../../services/utils');
const { validateCredentials } = require('../../middlewares/validators');
const User = require('../../models/User');
const Config = require('../../models/Config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/signup', [validateCredentials], (req, res) => {
  const body = req.body;

  const user = new User({
    email: body.email,
    password: bcrypt.hashSync(body.password, parseInt(process.env.CRYPT_ROUNDS))
  });
  
  Config.findOne({ validSignupToken: 'meeh' })
    .then(algo => console.log(algo));

  user.save()
    .then((userDb) => {

      res.json({
        ok: true,
        message: 'Success',
        data: userDb
      });

    })
    .catch((error) => handleError(res, 400, error.errmsg));

});

app.post('/login', [validateCredentials], (req, res) => {
  const body = req.body;

  User.findOne({ email: body.email, active: true })
    .then((userDb) => {

      if (userDb === null) return handleError(res, 400, '[email] or password is incorrect');
      if (!bcrypt.compareSync(body.password, userDb.password))
        return handleError(res, 400, 'email o [password] is incorrect');

      const payload = {
        email: userDb.email
      };

      const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });

      res.json({
        ok: true,
        message: 'Success',
        data: {
          token
        }
      });

    })
    .catch((error) => handleError(res, undefined, error));

});


module.exports = app;