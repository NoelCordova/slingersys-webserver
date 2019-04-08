const express = require("express");
const { handleError, encryptPassword } = require("../../services/utils");
const {
  validateTokenExpiration,
  validateTokenRole,
  validateUserAdmin
} = require("../../middlewares/validators");
const User = require("../../models/User");
const app = express();

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
    .catch(error => handleError(res, undefined, error.errmsg));
});

app.get("/:email", [validateTokenExpiration, validateTokenRole], (req, res) => {
  const email = req.params.email;

  User.findOne({ email, active: true })
    .then(userDb => {
      if (userDb === null)
        return handleError(res, 400, "Usuario no encontrado");

      const data = userDb;

      res.json({
        ok: true,
        message: "Success",
        data
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg));
});

const putMiddlewares = [
  validateTokenExpiration,
  validateTokenRole,
  validateUserAdmin
];

app.put("/:email", putMiddlewares, (req, res) => {
  const email = req.params.email;
  const body = req.body;

  body.password = encryptPassword(body.password);

  User.findOneAndUpdate({ email, active: true }, body, { new: true })
    .then(userDb => {
      if (userDb === null)
        return handleError(res, 400, "Usuario no encontrado");

      const data = userDb;

      res.json({
        ok: true,
        message: "Success",
        data
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg));
});

const deleteMiddlewares = [validateTokenExpiration, validateTokenRole];

app.delete("/:email", deleteMiddlewares, (req, res) => {
  const email = req.params.email;

  User.findOneAndUpdate({ email, active: true }, { active: false })
    .then(userDb => {
      if (userDb === null)
        return handleError(res, 400, "Usuario no encontrado");

      res.json({
        ok: true,
        message: "Succes"
      });
    })
    .catch(error => handleError(res, undefined, error.errmsg));
});

module.exports = app;
