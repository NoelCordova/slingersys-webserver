const { handleError } = require("../services/utils");
const Config = require("../models/Config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

/**
 * Function that validates the credentials for login or signup
 */
const validateCredentials = (req, res, next) => {
  const body = req.body;
  const validationSchema = Joi.object().keys({
    email: Joi.string()
      .regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{5,10}$/)
      .required()
  });

  const validResult = Joi.validate(
    { email: body.email, password: body.password },
    validationSchema
  );

  validResult.error !== null
    ? handleError(res, 400, validResult.error.details[0].message)
    : next();
};

/**
 * Function that validates the body for a edit user as admin
 */
const validateUserAdmin = (req, res, next) => {
  const body = req.body;
  const validationSchema = Joi.object().keys({
    email: Joi.string()
      .regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{5,10}$/)
      .required(),
    role: Joi.string()
      .equal([process.env.ROLE_ADMIN, process.env.ROLE_USER])
      .required()
  });

  const validResult = Joi.validate(
    { email: body.email, password: body.password, role: body.role },
    validationSchema
  );

  if (validResult.error !== null) {
    console.log(validResult.error.details);

    if (validResult.error.details[0].path[0] === "role")
      return handleError(res, 400, "El rol ingresado no es válido");
    else return handleError(res, 400, validResult.error.details[0].message);
  } else next();
};

/**
 * Function that validates the token in the database for signup permission
 */
const validateTokenSignup = (req, res, next) => {
  const body = req.body;

  Config.findOne({ validSignupToken: body.validSignupToken })
    .then(data =>
      data === null
        ? handleError(res, 400, "El token de inicio de sesión no es valido")
        : next()
    )
    .catch(error => handleError(res, undefined, error));
};

/**
 * Function that validates the exp date of the session token
 */
const validateTokenExpiration = (req, res, next) => {
  const Authorization = req.get("Authorization");

  if (Authorization === undefined)
    return handleError(
      res,
      401,
      "No tienes autorización para acceder a esta ruta"
    );

  const token = Authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, payload) => {
    error ? handleError(res, 401, error.name) : next();
  });
};

/**
 * Function that validates the admin role in the session token
 */
const validateTokenRole = (req, res, next) => {
  const Authorization = req.get("Authorization");

  if (Authorization === undefined)
    return handleError(
      res,
      401,
      "No tienes autorización para acceder a esta ruta"
    );

  const token = Authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, payload) => {
    if (error) return handleError(res, 401, error.name);

    payload.role !== process.env.ROLE_ADMIN
      ? handleError(
          res,
          401,
          "No tienes autorización para acceder a esta ruta: [role]"
        )
      : next();
  });
};

/**
 * Function that validates the identity (email or username) in the session token
 */
const validateTokenIdentity = (req, res, next) => {
  const Authorization = req.get("Authorization");
  const email = req.params.email;

  if (Authorization === undefined)
    return handleError(
      res,
      401,
      "No tienes autorización para acceder a esta ruta"
    );

  const token = Authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, payload) => {
    if (error) return handleError(res, 401, error.name);

    payload.email !== email
      ? handleError(
          res,
          401,
          "No tienes autorización para acceder a esta ruta: [email]"
        )
      : next();
  });
};

module.exports = {
  validateCredentials,
  validateUserAdmin,
  validateTokenSignup,
  validateTokenExpiration,
  validateTokenRole,
  validateTokenIdentity
};
