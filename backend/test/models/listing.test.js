const mongoose = require('mongoose');
const { expect, models, lib } = require('../setup');
const listing = require('../fixtures/listing').createFake();

const { Listing } = models;
const { Db } = lib;
const { MONGODB_URI, DB_NAME } = process.env;

describe('Models', () => {
  describe('Listing', () => {
    let db;

    beforeEach(async function () {
      db = new Db(`${MONGODB_URI}/${DB_NAME}`);
      await db.connect();
    });

    afterEach(async function() {
      await db.disconnect();
    });

    describe('validations', () => {
      describe('Success', () => {
        it('creates a new listing', async () => {
          const newListing = new Listing(listing);
          const result = await newListing.save();
          expect(result._id).not.to.equal('');
          expect(result._id instanceof mongoose.mongo.ObjectId).to.eq(true);
        });
      });

      describe('Failure', () => {
        it('it fails for empty data', async () => {
          try {
            const invalidSchema = {};
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed/i);
          }
        });
  
        it('fails when userId provided is invalid mongoDb ID', async () => {
          try {
            const invalidSchema = {
              ...listing,
              postedBy: 'invalid-id',
            };
  
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/Cast to ObjectId failed for value/i);
          } 
        });
  
        it('fails when price is missing', async () => {
          try {
            const invalidSchema = {
              ...listing,
              price: null,
            };
  
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: price/i);
          } 
        });
  
        it('fails when size is missing', async () => {
          try {
            const invalidSchema = {
              ...listing,
              size: null,
            };
  
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: size/i);
          } 
        });
  
        it('fails when address is missing', async () => {
          try {
            const invalidSchema = {
              ...listing,
              address: null,
            };
  
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: address/i);
          } 
        });
  
        it('fails when bedrooms is missing', async () => {
          try {
            const invalidSchema = {
              ...listing,
              bedrooms: null,
            };
  
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: bedrooms/i);
          } 
        });
  
        it('fails when bathrooms is missing', async () => {
          try {
            const invalidSchema = {
              ...listing,
              bathrooms: null,
            };
  
            await new Listing(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: bathrooms/i);
          } 
        });
      });
    });
  });
});
