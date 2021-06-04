module.exports = {
  DATA_NOT_MODIFIED: {
    statusCode: 304,
    body: {
      code: 'not_modified',
      message: 'Data not modified.',
    },
  },
  DATA_INVALID: {
    statusCode: 400,
    body: {
      code: 'bad_request',
      message: 'Invalid data.',
    },
  },
  TOKEN_INVALID: {
    statusCode: 400,
    body: {
      code: 'bad_request',
      message: 'Invalid token.',
    },
  },
  PARAMS_INVALID: {
    statusCode: 400,
    body: {
      code: 'bad_request',
      message: 'Invalid parameter.',
    },
  },
  EMAIL_ALREADY_VERIFIED: {
    statusCode: 400,
    body: {
      code: 'bad_request',
      message: 'Email is already verified.',
    },
  },
  UNAUTHORIZED: {
    statusCode: 401,
    body: {
      code: 'unauthorized',
      message: 'User is unauthorized for access.',
    },
  },
  NOT_VERIFIED: {
    statusCode: 401,
    body: {
      code: 'unauthorized',
      message: 'Email is not verified.',
    },
  },
  RESOURCE_NOT_FOUND: {
    statusCode: 404,
    body: {
      code: 'not_found',
      message: 'Resource not found.',
    },
  },
  USER_LOGGED_IN: {
    statusCode: 409,
    body: {
      code: 'conflict',
      message: 'User is already logged in.',
    },
  },
  DUPLICATE_KEY_ERROR: {
    statusCode: 409,
    body: {
      code: 'conflict',
      message: 'Duplicate key error.',
    },
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    body: {
      code: 'internal_server_error',
      message: 'Something wrong with the server.',
    },
  },
};
