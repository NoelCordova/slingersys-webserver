const bcrypt = require('bcrypt');

const handleError = (res, code, message) => {
  code !== undefined ? code : code = 500;

  res.status(code).json({
    ok: false,
    code,
    message
  });
};

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.CRYPT_ROUNDS));
};

const comparePassword = (bodyPassword, dbPassword) => {
  return bcrypt.compareSync(bodyPassword, dbPassword);
};

module.exports = {
  handleError,
  encryptPassword,
  comparePassword
}