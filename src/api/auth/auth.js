const express = require('express');
const { handleError } = require('../../services/utils');
const { validateCredentials, validateTokenSignup } = require('../../middlewares/validators');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/signup', [validateTokenSignup, validateCredentials], (req, res) => {
  const body = req.body;

  const user = new User({
    email: body.email,
    password: bcrypt.hashSync(body.password, parseInt(process.env.CRYPT_ROUNDS))
  });

  user.save()
    .then(() => {

      res.json({
        ok: true,
        message: 'Signup complete'
      });

    })
    .catch((error) => handleError(res, 400, error.errmsg));

});

app.post('/login', [validateCredentials], (req, res) => {
  const body = req.body;

  User.findOne({ email: body.email, active: true }).select({email: 1, role: 1, password: 1}).exec((error, userDb) => {
    if (error) handleError(res, undefined, error);
    
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

  });

});


module.exports = app;