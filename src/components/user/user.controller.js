const userService = require('./user.service');
const { sendRegistrationEmail } = require('../../utils/registraction-email');

const filterData = (data) => {
  const returnObj = {
    id: data.id,
    name: data.name,
    email: data.email,
  };
  return returnObj;
};

module.exports = {
  login: async (req, res, next) => {
    try {
      const data = req.body;
      const eventData = await userService.authenticate(data);
      req.session.userId = eventData.id;
      req.session.userName = eventData.name;
      const filteredData = filterData(eventData);
      res.status(200).json(filteredData);
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const data = req.body;
      const eventData = await userService.create(data);
      const filteredData = filterData(eventData);
      await sendRegistrationEmail(filteredData);
      res.status(201).json(filteredData);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res) => {
    req.session.userId = null;
    res.status(200).json({ message: 'User Logged Out.' });
  },

  verifyReg: async (req, res, next) => {
    try {
      const userId = req.jwtId;
      await userService.verifyUser(userId);
      res.status(200).json({ message: 'Your email is verified.' });
    } catch (error) {
      next(error);
    }
  },

  disapproveReg: async (req, res, next) => {
    try {
      const userId = req.jwtId;
      await userService.disapproveUser(userId);
      res.status(200).json({ message: 'Your registration is disapproved.' });
    } catch (error) {
      next(error);
    }
  },
};
