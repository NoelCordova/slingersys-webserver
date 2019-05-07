const { Router } = require('express');

const auth = require('./api/auth/auth');
const user = require('./api/user/users');

const router = Router();

router.use('/auth', auth);
router.use('/users', user);

module.exports = router;
