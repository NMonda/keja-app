const mongoose = require('mongoose');

async function clearDatabase() {
  await mongoose.connection.dropDatabase();
}

module.exports = clearDatabase;
