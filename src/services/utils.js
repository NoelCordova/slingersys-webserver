const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CRYPT_ROUNDS, TOKEN_SECRET_KEY, TOKEN_EXPIRES } = require('../config');

const encryptPassword = password => bcrypt.hashSync(password, parseInt(CRYPT_ROUNDS));

const comparePassword = (bodyPassword, dbPassword) => bcrypt.compareSync(bodyPassword, dbPassword);

const createJWT = payload => jwt.sign(payload, TOKEN_SECRET_KEY, {
  expiresIn: TOKEN_EXPIRES,
});

module.exports = {
  encryptPassword,
  comparePassword,
  createJWT,
};
