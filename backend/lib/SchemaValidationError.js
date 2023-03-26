class SchemaValidationError extends Error {
  constructor(message) {
    super(message);

    this.name = 'SchemaValidationError';
  }
}

module.exports = SchemaValidationError;
