const express = require('express');
const { handleError } = require('../../services/utils');
const { validateEmail } = require('../../middlewares/validators');
const User = require('../../models/User');
const app = express();

app.post('/signup', [validateEmail], async (req, res) => {
  const body = req.body;
  
  const user = new User({
    email: body.email,
    password: body.password
  });
  
  await user.save()
    .then(userDb => {

      res.json({
        ok: true,
        message: 'Success',
        data: userDb
      });

    })
    .catch(error => handleError(res, undefined, error.errmsg));

});

app.post('/login', [validateEmail], (req, res) => {

});


module.exports = app;