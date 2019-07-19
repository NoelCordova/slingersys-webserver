const Joi = require('joi');

require('dotenv').config();

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .default('development')
    .equal(['development', 'production']),
  PORT: Joi.number().default('3000'),
  MONGO_URI: Joi.string().default('mongodb://localhost:27017/slingersys-local'),
  DB_COLLECTION_USERS: Joi.string().default('users'),
  DB_COLLECTION_CONFIG: Joi.string().default('config'),
  CRYPT_ROUNDS: Joi.number().default('10'),
  TOKEN_SECRET_KEY: Joi.string().default('abcdefg'),
  TOKEN_EXPIRES: Joi.string().default('1h'),
  ROLE_USER: Joi.string().default('user'),
  ROLE_ADMIN: Joi.string().default('admin'),
  VALID_SIGNUP_TOKEN: Joi.string().required(),
}).unknown(true);

const { error, value: config } = Joi.validate(process.env, schema);

if (error) {
  // eslint-disable-next-line no-console
  console.error(error.message);
  process.exit(1);
}

module.exports = config;
