const router = require('express').Router();
const { signup, login } = require('./auth.controller');
const {
  validateCredentialsSignup,
  validateTokenSignup,
  validateCredentialsLogin,
} = require('../../middlewares/validators');

router.post('/signup', [validateTokenSignup, validateCredentialsSignup, signup]);
router.post('/login', [validateCredentialsLogin, login]);

module.exports = router;
