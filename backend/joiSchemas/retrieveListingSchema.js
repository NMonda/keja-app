const Joi = require('./joi');
const { ListingError } = require('../errors');

module.exports = Joi.object({
  listingId: Joi.objectId()
    .required()
    .error(new ListingError('listingId must be a valid MongoDb ID')),
});
