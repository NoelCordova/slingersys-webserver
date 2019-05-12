const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptPassword = password => bcrypt.hashSync(password, parseInt(process.env.CRYPT_ROUNDS));

const comparePassword = (bodyPassword, dbPassword) => bcrypt.compareSync(bodyPassword, dbPassword);

const createJWT = payload => jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
  expiresIn: process.env.TOKEN_EXPIRES,
});

module.exports = {
  encryptPassword,
  comparePassword,
  createJWT,
};
