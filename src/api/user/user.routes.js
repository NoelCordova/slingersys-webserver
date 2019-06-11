const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('./user.controller');
const { validateTokenRole } = require('../../middlewares/validators');

router.get('/:username', [validateTokenRole, getUser]);
router.put('/:username', [validateTokenRole, updateUser]);
router.delete('/:username', [validateTokenRole, deleteUser]);

module.exports = router;
