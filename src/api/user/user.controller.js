const User = require('../../models/user.model');
const { encryptPassword } = require('../../services/utils');

async function getUser(req, res, next) {
  try {
    const { username } = req.params;

    const userDb = await User.findOne({ username, active: true }).exec();

    res.json({
      ok: true,
      message: 'Success',
      username,
      data: userDb !== null ? userDb : 'User not found',
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { username } = req.params;
    const { body } = req;

    body.password = encryptPassword(body.password);

    const userDb = await User.findOneAndUpdate({ username, active: true }, body, { new: true });

    if (userDb === null) {
      res.status(400);
      throw new Error('Error on update, no user found');
    }

    res.json({
      ok: true,
      message: 'Success',
      username,
      data: userDb,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { username } = req.params;

    const userDb = await User.findOneAndUpdate({ username, active: true }, { active: false });

    if (userDb === null) {
      res.status(400);
      throw new Error('Error on delete, no user found');
    }

    res.json({
      ok: true,
      message: 'Success',
      username,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUser, updateUser, deleteUser };
