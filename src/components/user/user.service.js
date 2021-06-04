const User = require('../../lib/mongooseConfig').models.userModel;

module.exports = {
  authenticate: async (data) => {
    const eventData = data;
    const queryResult = await User.findOne(eventData);
    if (!queryResult) throw new Error('UNAUTHORIZED');
    return queryResult;
  },

  create: async (data) => {
    const eventData = new User(data);
    const queryResult = await eventData.save();
    return queryResult;
  },

  getAllUserForTodoScheduler: async () => {
    const queryResult = await User.find({}, { _id: 1, name: 1 });
    return queryResult;
  },

  getUserByEmail: async (email) => {
    const queryResult = await User.findOne({ email });
    return queryResult;
  },

  verifyUser: async (userId) => {
    const queryResult = await User.findById(userId);
    if (!queryResult) throw new Error('TOKEN_INVALID');
    if (queryResult.verified === true) throw new Error('EMAIL_ALREADY_VERIFIED');
    await queryResult.updateOne({ verified: true });
    return queryResult;
  },

  disapproveUser: async (userId) => {
    const queryResult = await User.findById(userId);
    if (!queryResult) throw new Error('TOKEN_INVALID');
    if (queryResult.verified === true) throw new Error('EMAIL_ALREADY_VERIFIED');
    await queryResult.delete();
    return queryResult;
  },
};
