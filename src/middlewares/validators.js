const { handleError } = require('../services/utils');
const Config = require('../models/Config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const validateCredentials = (req, res, next) => {
  const body = req.body;
  const validationSchema = Joi.object().keys({
    email: Joi.string().regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/),
    password: Joi.string().regex(/^[a-zA-Z0-9_]{5,10}$/)
  });

  const validResult = Joi.validate({ email: body.email, password: body.password }, validationSchema);

  validResult.error !== null ? handleError(res, 400, validResult.error.details[0].message) : next();
}

const validateTokenSignup = (req, res, next) => {
  const body = req.body;

  Config.findOne({ validSignupToken: body.validSignupToken })
    .then(data => data === null ? handleError(res, 400, 'El token de inicio de sesiòn no es valido') : next())
    .catch(error => handleError(res, undefined, error));
}

const validateTokenExpiration = (req, res, next) => {
  const Authorization = req.get('Authorization');

  if (Authorization === undefined) return handleError(res, 401, 'No tienes autorización para acceder a esta ruta');

  const token = Authorization.split(' ')[1];

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, payload) => {
    error ? handleError(res, 401, error.name) : next();
  });
}

const validateTokenRole = (req, res, next) => {
  const Authorization = req.get('Authorization');

  if (Authorization === undefined) return handleError(res, 401, 'No tienes autorización para acceder a esta ruta');

  const token = Authorization.split(' ')[1];

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, payload) => {

    if (error) return handleError(res, 401, error.name);

    payload.role !== process.env.ROLE_ADMIN ? handleError(res, 401, 'No tienes autorización para acceder a esta ruta') : next();
  });
}


module.exports = {
  validateCredentials,
  validateTokenSignup,
  validateTokenExpiration,
  validateTokenRole
}