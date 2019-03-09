
const handleError = (res, code, message) => {
  code = code !== undefined ? code : 500;

  res.status(code).json({
    ok: false,
    code,
    message
  });
};

const KEYS = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER'
};


module.exports = { handleError, KEYS }