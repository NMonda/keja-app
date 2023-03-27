class ListingError extends Error {
  constructor(message) {
    super(message);

    this.name = 'ListingError';
  }
}

module.exports = ListingError;
