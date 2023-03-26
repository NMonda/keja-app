const {
  listingJoiSchema, 
  SchemaValidationError,
} = require('../lib');

/**
 * This service is responsible for data validation during create, retrieval & updating a listing
 */

module.exports = {
  /**
   * This function validates the provided request body payload against listingSchema
   * @param {Object} payload 
   * @returns {Object | Error} Either returns a validated object or an error
   */
  async createListing(payload) {
    try {
      const { value, error } = listingJoiSchema.validate(payload);
      if (error) {
        throw new SchemaValidationError(error.message);
      }

      return value;
      
    } catch (error) {
      throw new SchemaValidationError(error.message);
    }
  },
};
