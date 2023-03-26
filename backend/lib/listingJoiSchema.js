const { Joi } = require('celebrate');
const SchemaValidationError = require('./SchemaValidationError');

// set the ObjectID here (used for Validating MongoDB id)
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Joi.object({
  userId: Joi.objectId()
    .required()
    .error(new SchemaValidationError('userId must be a valid MongoDb ID')),
  address: Joi.string()
    .required()
    .error(new SchemaValidationError('address must be a valid string')),
  size: Joi.string()
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


