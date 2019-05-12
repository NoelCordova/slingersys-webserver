const router = require('express').Router();

const auth = require('./api/auth/auth.routes');
const user = require('./api/user/users');

router.use('/auth', auth);
router.use('/users', user);

module.exports = router;
