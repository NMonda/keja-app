const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { models } = require('../setup');

const { Listing } = models;

module.exports = {
  createFake() {
    return {
      postedBy: new mongoose.Types.ObjectId(),
      address: faker.address.city(),
      price: faker.datatype.float(),
      bedrooms: faker.datatype.number(),
      bathrooms: faker.datatype.number(),
      size: faker.datatype.number(),
    };
  },
  createRequestBody(userId = new mongoose.Types.ObjectId()) {
    return {
      userId,
      address: faker.address.city(),
      price: faker.datatype.float(),
      bedrooms: faker.datatype.number(),
      bathrooms: faker.datatype.number(),
      size: faker.datatype.number(),
    }
  },

  createInvalidRequestBody() {
    // missing userId
    return {
      address: faker.address.city(),
      price: faker.datatype.float(),
      bedrooms: faker.datatype.number(),
      bathrooms: faker.datatype.number(),
      size: faker.datatype.number(),
    };
  },

  async createDbListing() {
    const listing = {
      postedBy: new mongoose.Types.ObjectId(),
      address: faker.address.city(),
      price: faker.datatype.float(),
      bedrooms: faker.datatype.number(),
      bathrooms: faker.datatype.number(),
      size: faker.datatype.number(),
    };

    const newListing = new Listing(listing);
    const dbListing = await newListing.save();
    return dbListing;
  },
};
