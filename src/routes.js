const router = require('express').Router();

const auth = require('./api/auth/auth.routes');
const user = require('./api/user/user.routes');
const users = require('./api/users/users.routes');

router.use('/auth', auth);
router.use('/user', user);
router.use('/users', users);

module.exports = router;
