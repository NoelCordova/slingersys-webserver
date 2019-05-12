const router = require('express').Router();
const { signup, login } = require('./auth.controller');
const {
  validateCredentialsSignup,
  validateCredentialsLogin,
} = require('../../middlewares/validators');

router.post('/signup', [validateCredentialsSignup, signup]);
router.post('/login', [validateCredentialsLogin, login]);

module.exports = router;
