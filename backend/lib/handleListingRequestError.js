const { SchemaValidationError, ListingError } = require('../errors');

module.exports = (error) => {
  if (error instanceof SchemaValidationError) {
    return {
      statusCode: 400,
      errorMessage: error.message,
    };
  }

  if (error instanceof ListingError) {
    return {
      statusCode: 422,
      errorMessage: error.message,
    };
  }

  throw new Error('A server error occurred while creating a listing');
};
