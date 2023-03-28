const sinon = require('sinon');
const { expect, lib, services, models } = require('../setup');
const listing = require('../fixtures/listing').createFake();

const { listingsService } = services;
const { Listing } = models;
const { Db } = lib;
const { MONGODB_URI, DB_NAME } = process.env;

describe('listingsService', () => {
  let db;

  beforeEach(async function () {
    db = new Db(`${MONGODB_URI}/${DB_NAME}`);
    await db.connect();
  });

  afterEach(async function() {
    await db.dropDatabase();
    await db.disconnect();
  });

  describe('#createListing', () => {
    describe('with valid schema', () => {
      it('then it creates a listing', async () => {
        const allRecords = await Listing.find();
        const correctListing = { ...listing };
        delete correctListing.postedBy;
        const result = await listingsService.createListing({
          model: Listing,
          payload: {
            ...correctListing,
            userId: '6421f14da96e22789b5d358e',
          },
        });

        expect(result._id).not.to.eq('');
        expect(result.createdAt).not.to.eq(undefined);

        const newAllRecords = await Listing.find();
        expect(newAllRecords.length).to.eq(allRecords.length + 1);
      });
    });

    describe('with invalid schema', () => {
      it('Then it fails', async () => {
        // has an extra field
        const invalidSchema = { ...listing };
        const result = await listingsService.createListing({
          model: Listing,
          payload: {
            ...invalidSchema,
            userId: '6421f14da96e22789b5d358e',
          },
        });

        expect(result.errorMessage).to.match(/"postedBy" is not allowed/i);
        expect(result.statusCode).to.eq(400);
      });

      it('Then it does not call the Db', async () => {
        const newListing = new Listing({
          ...listing,
          userId: '6421f14da96e22789b5d358e',
        });

        const saveSpy = sinon.spy();
        const saveStub = sinon.stub(newListing, 'save').callsFake(saveSpy);

        const invalidSchema = { ...listing };
        await listingsService.createListing({
          model: Listing,
          payload: {
            ...invalidSchema,
            userId: '6421f14da96e22789b5d358e',
          },
        });

        expect(saveStub.callCount).to.eq(0);

        saveStub.restore();
      });
    });
  });

  describe('#retrieveListingById', () => {
    describe('with valid schema', () => {
      let listingId;
      beforeEach(async function() {
        const correctListing = { ...listing };
        delete correctListing.postedBy;
        const result = await listingsService.createListing({
          model: Listing,
          payload: {
            ...correctListing,
            userId: '6421f14da96e22789b5d358e',
          },
        });

        listingId = result._id.toString();
      });

      it('returns the found listing', async () => {
        const result = await listingsService.retrieveListingById({
          listingId,
          model: Listing,
        });

        expect(result._id.toString()).to.eq(listingId);
      });

      it('returns null if no listing is found', async () => {
        const wrongListingId = `${listingId.slice(0, -1)}0`;
        const result = await listingsService.retrieveListingById({
          listingId: wrongListingId,
          model: Listing,
        });

        expect(result).to.be.a('null');
      });
    });

    describe('with invalid schema', () => {
      it('fails with the correct error message', async() => {
        const result = await listingsService.retrieveListingById({
          listingId: 'wrong-list-id',
          model: Listing,
        });

        expect(result.statusCode).to.eq(400);
        expect(result.errorMessage).to.match(/listingId must be a valid MongoDb ID/i);
      });
    });
  });

  describe('#getAllListings', () => {
    describe('When there is no data', () => {
      it('returns an empty array', async () => {
        const result = await listingsService.getAllListings(Listing);
        expect(result.length).to.eq(0);
      });
    });

    describe('When there is data', () => {
      beforeEach(async function() {
        await new Listing(listing).save();
      });

      it('returns all the data', async () => {
        const result = await listingsService.getAllListings(Listing);
        expect(result.length).to.eq(1);
      });
    });
  });
});
