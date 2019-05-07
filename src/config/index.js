const Joi = require('joi');

require('dotenv').config();

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .default('development')
    .equal(['development', 'production']),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().default('mongodb://localhost:27017/slingersys-local'),
  DB_COLLECTION_USERS: Joi.string().default('users'),
  DB_COLLECTION_CONFIG: Joi.string().default('config'),
  CRYPT_ROUNDS: Joi.number().required(),
  TOKEN_SECRET_KEY: Joi.string().required(),
  TOKEN_EXPIRES: Joi.string().required(),
  ROLE_USER: Joi.string().default('user'),
  ROLE_ADMIN: Joi.string().default('admin'),
}).unknown(true);

const { error, value: config } = Joi.validate(process.env, schema);

if (error) {
  // eslint-disable-next-line no-console
  console.log(error.message);
  process.exit(1);
}

module.exports = config;
