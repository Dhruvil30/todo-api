const { JWT_KEY } = process.env;

const jwt = require('jsonwebtoken');
const helper = require('./helper');
const { getUserByEmail } = require('../components/user/user.service');

module.exports = {
  checkSessionForLoggedOutUser: (req, res, next) => {
    const userId = helper.getUserId(req);
    if (!userId) next();
    else throw new Error('USER_LOGGED_IN');
  },

  checkSessionForLoggedInUser: (req, res, next) => {
    const userId = helper.getUserId(req);
    if (userId) {
      req.user = {};
      req.user.id = userId;
      next();
    } else throw new Error('UNAUTHORIZED');
  },

  verifyEmail: async (req, res, next) => {
    const { token } = req.params;
    try {
      const userId = jwt.verify(token, JWT_KEY);
      req.verifyId = userId;
      next();
    } catch (error) {
      next(new Error('TOKEN_INVALID'));
    }
  },

  checkIsUserVerified: async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user.verified) next();
    else next(new Error('NOT_VERIFIED'));
  },
};
