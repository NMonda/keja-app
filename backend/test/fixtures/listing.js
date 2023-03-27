const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker')

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
};
