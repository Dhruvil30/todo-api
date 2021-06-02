module.exports = {
  getUserId: (req) => {
    const env = process.env.NODE_ENV;
    if (env === 'local') return req.session.userId;
    return req.get('userId');
  },
};
