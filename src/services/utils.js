const handleError = (res, code, message) => {
  code !== undefined ? code : code = 500;

  res.status(code).json({
    ok: false,
    code,
    message
  });
};

const KEYS = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
  DB_USERS: 'users',
  DB_CONFIG: 'config'
};


module.exports = { handleError, KEYS }