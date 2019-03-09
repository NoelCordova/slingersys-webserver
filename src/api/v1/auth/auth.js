const express = require('express');
const mongoose = require('mongoose');
const { validateEmail } = require('../../../middlewares/validators');
const User = require('../../../models/User');
const app = express();

app.post('/login', [validateEmail], (req, res) => {
  const body = req.body;

  const user = new User({
    email: body.email,
    password: body.password,
    active: true,
    role: 'asd'
  });

  user.save((error, userDb) => {

    if (error) {
      return res.json({
        ok: false,
        message: 'Error'
      })
    }

    res.json({
      ok: true,
      message: '',
      data: userDb
    });

  });

});


module.exports = app;