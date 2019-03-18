const { handleError } = require('../services/utils');
const Joi = require('joi');

const validateCredentials = (req, res, next) => {

  const validationSchema = Joi.object().keys({
    email: Joi.string().regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/),
    password: Joi.string().regex(/^[a-zA-Z0-9_]{5,10}$/)
  });

  const body = req.body;

  const validResult = Joi.validate(body, validationSchema);

  validResult.error !== null ? handleError(res, 400, validResult.error.details[0].message) : next();

}


module.exports = { validateCredentials }