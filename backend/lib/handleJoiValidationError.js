const SchemaValidationError = require('./SchemaValidationError');

function handleJoiValidationError(error) {
  if (error instanceof SchemaValidationError) {

    return {
      statusCode: 422,
      errorMessage: error.message,
    };
  }

  return {
    statusCode: 500,
    errorMessage: 'A server error occurred while creating a listing',
  };
}

module.exports = handleJoiValidationError;
