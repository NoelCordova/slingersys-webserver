const Joi = require('joi');

const validateEmail = (req, res, next) => {

  const validationSchema = Joi.object().keys({
    email: Joi.string().regex(/^[a-zA-Z0-9_.-]*@(gmail|hotmail)(.com)$/),
    password: Joi.string().regex(/^[a-zA-Z0-9_]{5,10}$/)
  });

  const body = req.body;

  const validResult = Joi.validate(body, validationSchema);

  if (validResult.error !== null) {
    return res.status(400).json({
      message: 'The login info is wrong',
      err: validResult
    });
  }

  next();

}


module.exports = { validateEmail }