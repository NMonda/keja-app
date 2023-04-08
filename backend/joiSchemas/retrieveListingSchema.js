const Joi = require('./joi');
const { ListingError } = require('../errors');

module.exports = Joi.object().keys({
  listingId: Joi.objectId()
    .required()
    .error(new ListingError('listingId must be a valid MongoDb ID')),
});
