const userService = require('./user.service');

module.exports = {
  login: async (req, res, next) => {
    try {
      const data = req.body;
      const eventData = await userService.authenticate(data);
      req.session.userId = eventData.id;
      req.session.userName = eventData.name;
      res.status(200).json(eventData);
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const data = req.body;
      const eventData = await userService.create(data);
      req.session.userId = eventData.id;
      req.session.userName = eventData.name;
      res.status(201).json(eventData);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res) => {
    req.session.userId = null;
    res.status(200).json({ message: 'User Logged Out.' });
  }
};
