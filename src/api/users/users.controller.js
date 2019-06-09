const User = require('../../models/user.model');

// WIP: sort and sortby
async function getAllUsers(req, res, next) {
  try {
    let {
      skip,
      limit,
      sort,
      sortby,
    } = req.query;

    if (skip && !Number.isNaN(Number(skip))) {
      skip = parseInt(skip);
    } else {
      skip = 0;
    }

    if (limit && !Number.isNaN(Number(limit))) {
      limit = parseInt(limit);
    } else {
      limit = 0;
    }

    if (sort && sort === ('asc' || 'desc')) {
      // eslint-disable-next-line no-unused-expressions
      sort === 'asc' ? sort = 1 : sort = -1;
    } else {
      sort = 1;
    }

    if (sortby) {
      sortby = 'email';
    } else {
      sortby = 'email';
    }

    const usersDb = await User.find({ active: true })
      .skip(skip)
      .limit(limit)
      .sort([[sortby, sort]])
      .exec();

    if (usersDb === null) {
      res.status(400);
      throw new Error('Cannot get data from database');
    }

    res.json({
      ok: true,
      message: 'Success',
      skip,
      limit,
      sort,
      sortby,
      total: usersDb.length,
      data: usersDb.length !== 0 ? [...usersDb] : 'No users registered',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUsers };
