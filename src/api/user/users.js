const express = require("express");
const { handleError, encryptPassword } = require("../../services/utils");
const {
  validateTokenExpiration,
  validateTokenRole,
  validateUserInfoAsAdmin
} = require("../../middlewares/validators");
const User = require("../../models/user.model");
const app = express();

const fileSrc = "src/api/user/users.js";

app.get("/", [validateTokenExpiration, validateTokenRole], (req, res) => {
  let skip = req.query.skip;
  let limit = req.query.limit;

  skip && !isNaN(parseInt(skip)) ? (skip = parseInt(skip)) : (skip = 0);
  limit && !isNaN(limit) ? (limit = parseInt(limit)) : (limit = 10);

  User.find({ active: true })
    .skip(skip)
    .limit(limit)
    .then(usersDb => {
      res.json({
        ok: true,
        message: "Success",
        skip,
        limit,
        total: usersDb.length,
        data: [...usersDb]
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg, fileSrc, 33));
});

app.get(
  "/:username",
  [validateTokenExpiration, validateTokenRole],
  (req, res) => {
    const username = req.params.username;

    User.findOne({ username, active: true })
      .then(userDb => {
        if (userDb === null)
          return handleError(res, 400, "Usuario no encontrado", fileSrc, 45);

        const data = userDb;

        res.json({
          ok: true,
          message: "Success",
          data
        });
      })
      .catch(error => handleError(res, undefined, error.errmsg, fileSrc, 55));
  }
);

const putMiddlewares = [
  validateTokenExpiration,
  validateTokenRole,
  validateUserInfoAsAdmin
];

app.put("/:username", putMiddlewares, (req, res) => {
  const username = req.params.username;
  const body = req.body;

  body.password = encryptPassword(body.password);

  User.findOneAndUpdate({ username, active: true }, body, { new: true })
    .then(userDb => {
      if (userDb === null)
        return handleError(res, 400, "Usuario no encontrado", fileSrc, 74);

      const data = userDb;

      res.json({
        ok: true,
        message: "Success",
        data
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg, fileSrc, 84));
});

const deleteMiddlewares = [validateTokenExpiration, validateTokenRole];

app.delete("/:username", deleteMiddlewares, (req, res) => {
  const username = req.params.username;

  User.findOneAndUpdate({ username, active: true }, { active: false })
    .then(userDb => {
      if (userDb === null)
        return handleError(res, 400, "Usuario no encontrado", fileSrc, 95);

      res.json({
        ok: true,
        message: "Success"
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg, fileSrc, 102));
});

module.exports = app;
