const handleError = (res, code, message) => {
  code !== undefined ? code : code = 500;

  res.status(code).json({
    ok: false,
    code,
    message
  });
};


module.exports = { handleError }