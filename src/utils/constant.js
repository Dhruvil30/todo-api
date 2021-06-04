module.exports = {
  rateLimitTime: 5 * 60 * 1000,
  rateLimitMaxReq: 5,
  rateLimitApis: ['/users/verify-reg/', '/users/disapprove-reg/'],
};
