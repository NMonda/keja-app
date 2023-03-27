const { Joi } = require('celebrate');

// set the ObjectID here (used for Validating MongoDB id)
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Joi;
