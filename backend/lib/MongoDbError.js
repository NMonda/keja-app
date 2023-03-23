class MongoDbError extends Error {
  constructor(message) {
    super(message);

    this.name = 'MongoDbError';
  }
}

module.exports = MongoDbError;
