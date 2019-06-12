const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { handleError } = require('../services/utils');
const Config = require('../models/config.model');
const { ROLE_ADMIN, TOKEN_SECRET_KEY } = require('../config');

const fileSrc = 'src/middlewares/validators.js';

/**
 * Function that validates the credentials for signup
 */
const validateCredentialsSignup = (req, res, next) => {
  try {
    const { body } = req;
    const validationSchema = Joi.object().keys({
      email: Joi.string()
        .regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/)
        .required(),
      username: Joi.string()
        .regex(/^[a-zA-Z_]{8,16}/)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9_]{5,10}$/)
        .required(),
    });

    const validResult = Joi.validate(
      { email: body.email, username: body.username, password: body.password },
      validationSchema,
    );

    if (validResult.error !== null) {
      res.status(400);
      throw new Error(validResult.error.details[0].message);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Function that validates the token in the database for signup permission
 */
const validateTokenSignup = async (req, res, next) => {
  try {
    const { body } = req;

    const tokenDb = await Config.findOne({ validSignupToken: body.validSignupToken })
      .exec();

    if (tokenDb === null) {
      res.status(400);
      throw new Error('Not token registered on db, signup not complete');
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Function that validates the credentials for login
 */
const validateCredentialsLogin = (req, res, next) => {
  try {
    const { body } = req;
    const validationSchema = Joi.object().keys({
      email: Joi.string()
        .regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9_]{5,10}$/)
        .required(),
    });

    const validResult = Joi.validate(
      { email: body.email, password: body.password },
      validationSchema,
    );

    if (validResult.error !== null) {
      res.status(400);
      throw new Error(validResult.error.details[0].message);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Function that validates the body for a edit user as admin
 */
const validateUserInfoAsAdmin = (req, res, next) => {
  const body = req.body;
  const validationSchema = Joi.object().keys({
    email: Joi.string()
      .regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/)
      .required(),
    username: Joi.string()
      .regex(/^[a-zA-Z_]{8,16}/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{5,10}$/)
      .required(),
    role: Joi.string()
      .equal([process.env.ROLE_ADMIN, process.env.ROLE_USER])
      .required()
  });

  const validResult = Joi.validate(
    {
      email: body.email,
      username: body.username,
      password: body.password,
      role: body.role
    },
    validationSchema
  );

  if (validResult.error !== null) {
    if (validResult.error.details[0].path[0] === 'role')
      return handleError(
        res,
        400,
        'El rol ingresado no es válido',
        fileSrc,
        56
      );
    else
      return handleError(
        res,
        400,
        validResult.error.details[0].message,
        fileSrc,
        64
      );
  } else next();
};

/**
 * Function that validates the exp date of the session token
 */
const validateTokenExpiration = (req, res, next) => {
  try {
    const Authorization = req.get('Authorization');

    if (Authorization === undefined) {
      res.status(401);
      throw new Error('You dont have the privilieges to access this route [no token]');
    }

    const token = Authorization.split(' ')[1];

    jwt.verify(token, TOKEN_SECRET_KEY, (error) => {
      if (error) {
        res.status(401);
        throw new Error('You dont have the privilieges to access this route [bad token]');
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Function that validates the admin role in the session token
 */
const validateTokenRole = (req, res, next) => {
  try {
    const Authorization = req.get('Authorization');

    if (Authorization === undefined) {
      res.status(401);
      throw new Error('You dont have the privilieges to access this route [no token]');
    }

    const token = Authorization.split(' ')[1];

    jwt.verify(token, TOKEN_SECRET_KEY, (error, payload) => {
      if (error) {
        res.status(401);
        throw new Error('You dont have the privilieges to access this route [bad token]');
      }

      if (payload.role !== ROLE_ADMIN) {
        res.status(401);
        throw new Error('You dont have the privilieges to access this route [role]');
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Function that validates the identity (email or username) in the session token
 */
const validateTokenIdentity = (req, res, next) => {
  const Authorization = req.get('Authorization');
  const email = req.params.email;

  if (Authorization === undefined)
    return handleError(
      res,
      401,
      'No tienes autorización para acceder a esta ruta',
      fileSrc,
      157
    );

  const token = Authorization.split(' ')[1];

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, payload) => {
    if (error) return handleError(res, 401, error.name);

    payload.email !== email
      ? handleError(
        res,
        401,
        'No tienes autorización para acceder a esta ruta: [email]',
        fileSrc,
        171
      )
      : next();
  });
};

module.exports = {
  validateCredentialsSignup,
  validateCredentialsLogin,
  validateUserInfoAsAdmin,
  validateTokenSignup,
  validateTokenExpiration,
  validateTokenRole,
  validateTokenIdentity,
};
