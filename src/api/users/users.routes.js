const router = require('express').Router();
const { getAllUsers } = require('./users.controller');
const { validateTokenRole } = require('../../middlewares/validators');

router.get('/', [validateTokenRole, getAllUsers]);

module.exports = router;
