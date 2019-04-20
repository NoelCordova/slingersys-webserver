const express = require("express");
const {
  handleError,
  encryptPassword,
  comparePassword,
  createJWT
} = require("../../services/utils");
const {
  validateCredentialsSignup,
  validateCredentialsLogin,
  validateTokenSignup
} = require("../../middlewares/validators");
const User = require("../../models/User");
const app = express();

const fileSrc = "src/api/auth/auth.js";

app.post(
  "/signup",
  [validateTokenSignup, validateCredentialsSignup],
  (req, res) => {
    const body = req.body;

    const user = new User({
      email: body.email,
      username: body.username,
      password: encryptPassword(body.password)
    });

    user
      .save()
      .then(() => {
        res.json({
          ok: true,
          message: "Signup complete"
        });
      })
      .catch(error => handleError(res, 400, error.errmsg, fileSrc, 33));
  }
);

app.post("/login", [validateCredentialsLogin], (req, res) => {
  const body = req.body;

  User.findOne({ email: body.email, active: true })
    .select({ username: 1, role: 1, password: 1 })
    .exec((error, userDb) => {
      if (error) handleError(res, undefined, error, fileSrc, 42);

      if (userDb === null)
        return handleError(
          res,
          400,
          "[email] or password is incorrect",
          fileSrc,
          45
        );
      if (!comparePassword(body.password, userDb.password))
        return handleError(
          res,
          400,
          "email o [password] is incorrect",
          fileSrc,
          53
        );

      console.log(userDb);

      const payload = {
        username: userDb.username,
        role: userDb.role
      };

      const token = createJWT(payload);

      res.json({
        ok: true,
        message: "Success",
        data: {
          token
        }
      });
    });
});

module.exports = app;
