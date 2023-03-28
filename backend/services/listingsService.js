const { SchemaValidationError } = require('../errors');
const { createListingSchema, retrieveListingSchema } = require('../joiSchemas');
const handleListingRequestError = require('../lib/handleListingRequestError');

/**
 * This service is responsible for data validation during create, retrieval & updating a listing
 */

module.exports = {
  /**
   * This function validates the provided request body payload against listingSchema
   * @param {Object} payload 
   * @returns {Object | Error} Either returns a validated object or an error
   */
  async createListing({ payload, model }) {
    try {
      const { value, error } = createListingSchema.validate(payload);
      if (error) {
        throw new SchemaValidationError(error.message);
      }

      const { address, price, bedrooms, bathrooms, size, userId } = value;
      const listing = new model({
        address,
        price,
        bedrooms,
        bathrooms,
        size,
        postedBy: userId,
      });
      const newListing = await listing.save();
      return newListing;
    } catch (error) {
      return handleListingRequestError(error);
    }
  },

  /**
   * Retrieves a Listing from DB
   * @param {Object} Mongoose Model
   * @param {String} listingId mongoDb Id
   * @returns {Object | Error} MongoDB record found or throws an error
   */
  async retrieveListingById({ model, listingId }) {
    try {
      const { value, error } = retrieveListingSchema.validate({ listingId });
      if (error) {
        throw new SchemaValidationError(error.message);
      }
      const foundItem = await model.findById(value.listingId);
      return foundItem;
    } catch (error) {
      return handleListingRequestError(error);
    }
  },

  /**
   * Retrieves all Listings from the DB.
   */
  async getAllListings(model) {
    try {
      const items = await model.find();
      return items;
    } catch (error) {
      return handleListingRequestError(error);
    }
  },
};
