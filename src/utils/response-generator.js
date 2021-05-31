const errorCodes = require('./error-codes');
const { mongoose } = require('../lib/mongooseConfig');

module.exports = {
  generateErrorResponse: (error) => {
    if (error.name === 'MongoError') {
      if (error.code === 11000) return errorCodes.DUPLICATE_KEY_ERROR;
      if (error.code === 51270) return errorCodes.RESOURCE_NOT_FOUND;
    }
    if (error instanceof mongoose.Error.CastError) {
      return errorCodes.RESOURCE_NOT_FOUND;
    }
    if (error instanceof SyntaxError || error.error?.isJoi) {
      return errorCodes.DATA_INVALID;
    }
    return errorCodes[error.message] || errorCodes.INTERNAL_SERVER_ERROR;
  }
};
