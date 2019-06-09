const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('./user.controller');
const { validateTokenExpiration } = require('../../middlewares/validators');

router.get('/:username', [validateTokenExpiration, getUser]);
router.put('/:username', [validateTokenExpiration, updateUser]);
router.delete('/:username', [validateTokenExpiration, deleteUser]);

module.exports = router;
