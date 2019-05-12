const User = require('../../models/User');
const { comparePassword, createJWT, encryptPassword } = require('../../services/utils');

async function signup(req, res, next) {
  try {
    const { body } = req;

    const user = new User({
      email: body.email,
      username: body.username,
      password: encryptPassword(body.password),
    });

    user.save();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { body } = req;

    const userDb = await User.findOne({ email: body.email, active: true })
      .select({ username: 1, role: 1, password: 1 })
      .exec();

    if (userDb === null) {
      res.status(400);
      throw new Error('[email] or password is incorrect');
    }

    if (!comparePassword(body.password, userDb.password)) {
      res.status(400);
      throw new Error('email or [password] is incorrect');
    }

    const payload = {
      username: userDb.username,
      role: userDb.role,
    };

    const token = createJWT(payload);

    res.json({
      ok: true,
      message: 'Success',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
};
