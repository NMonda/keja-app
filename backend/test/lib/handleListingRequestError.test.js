const { expect, lib, errors } = require('../setup');
const { handleListingRequestError } = lib;
const { ListingError, SchemaValidationError } = errors;

describe('handleListingRequestError', () => {
  describe('Given an instance SchemaValidationError', () => {
    it('Then it throws the correct error message', () => {
      const result = handleListingRequestError(new SchemaValidationError('invalid schema'));
      expect(result.statusCode).to.eq(400);
      expect(result.errorMessage).to.match(/invalid schema/i);
    });
  });

  describe('Given an instance ListingError', () => {
    it('Then it throws the correct error message', () => {
      const result = handleListingRequestError(new ListingError('could not create a listing'));
      expect(result.statusCode).to.eq(422);
      expect(result.errorMessage).to.match(/listing/i);
    });
  });


  describe('Given a server error', () => {
    it('Then it throws the correct error message', () => {
      try {
        handleListingRequestError(new Error('uh oh, houston has a problem!'));
      } catch (error) {
        expect(error instanceof ListingError).to.equal(false);
        expect(error instanceof SchemaValidationError).to.equal(false);
        expect(error.message).to.match(/houston has a problem/i);
      }
    });
  });
});