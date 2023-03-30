const request = require('supertest');
const { expect, lib, testServerPort } = require('../setup');
const listing = require('../fixtures/listing');
const { clearDatabase, closeDbConnection } = require('../helpers');

const { createApp } = lib;

describe('Routes', () => {
  describe('Listing', () => {
    let server;

    beforeEach(async () => {
      // await clearDatabase();
      const app = await createApp();
      server = app.listen(testServerPort);
    });

    afterEach(async () => {
      server.close();
      await closeDbConnection();
    });

    // POST REQUEST TO CREATE A LISTING
    describe('POST /api/v1/listings', () => {
      it('succeeds when the payload is valid', async () => {
        const reqBody = listing.createRequestBody();
        const response = await request(server).post('/api/v1/listings')
          .send(reqBody);

        expect(response.statusCode).to.eq(201);
        expect(response.body).to.have.property('_id');
      });

      it('fails when the payload is invalid', async () => {
        const reqBody = listing.createInvalidRequestBody();
        const response = await request(server).post('/api/v1/listings')
          .send(reqBody);

        expect(response.statusCode).to.eq(400);
        expect(response.body).to.have.property('errorMessage');
        expect(response.body.errorMessage).to.match(/userId must be a valid mongodb id/i);
      });
    });

    // GET REQUEST TO RETRIEVE ALL LISTINGS
    describe('GET /api/v1/listings', () => {
      // create test listings first
      beforeEach(async () => {
        await clearDatabase();
        await listing.createDbListing();
      });

      it('returns all the db listings', async () => {
        const response = await request(server).get('/api/v1/listings');

        expect(response.statusCode).to.eq(200);
        expect(response.body).to.be.an('Array');
        expect(response.body.length).to.eq(1);
      });
    });

    // GET REQUEST TO RETRIEVE A LISTING BY ITS ID
    describe('GET /api/v1/listings/:listingId', () => {
      let listingId;
      // create a test listing first
      beforeEach(async () => {
        await clearDatabase();
        const result = await listing.createDbListing();
        listingId = result._id.toString();
      });

      it('returns the found db listing', async () => {
        const response = await request(server).get(`/api/v1/listings/${listingId}`);

        expect(response.statusCode).to.eq(200);
        expect(response.body._id.toString()).to.eq(listingId);
      });

      it('returns 404 when a listing cannot be found in the DB ', async () => {
        const wrongListingId = `${listingId.slice(0, -1)}0`;
        const response = await request(server).get(`/api/v1/listings/${wrongListingId}`);

        expect(response.statusCode).to.eq(404);
        expect(response.text).to.eq(`No listing with id ${wrongListingId} found`);
      });
    });
  });
});
