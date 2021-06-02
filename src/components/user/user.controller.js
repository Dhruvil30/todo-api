const userService = require('./user.service');

const filterData = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
  }
}

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
      res.status(201).json(filteredData);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res) => {
    req.session.userId = null;
    res.status(200).json({ message: 'User Logged Out.' });
  },
};
