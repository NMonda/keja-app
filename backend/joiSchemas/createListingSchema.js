const Joi = require('./joi');
const { SchemaValidationError } = require('../errors');

module.exports = Joi.object({
  name: Joi.string()
    .required()
    .min(5)
    .error(new SchemaValidationError('name must contain at least 5 characters')),
  userId: Joi.objectId()
    .required()
    .error(new SchemaValidationError('userId must be a valid MongoDb ID')),
  address: Joi.string()
    .required()
    .error(new SchemaValidationError('address must be a valid string')),
  size: Joi.number()
    .required()
    .error(new SchemaValidationError('size must be a valid string')),
  price: Joi.number()
    .required()
    .error(new SchemaValidationError('price must be a valid integer')),
  bedrooms: Joi.number()
    .required()
    .error(new SchemaValidationError('bedrooms must be a valid integer')),
  bathrooms: Joi.number()
    .required()
    .error(new SchemaValidationError('bedrooms must be a valid integer')),
});
