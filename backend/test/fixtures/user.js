const { faker } = require('@faker-js/faker')

module.exports = {
  createFake() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(20),
    };
  },
};
