const mongoose = require('mongoose');

async function closeDbConnection() {
  await mongoose.disconnect();
}

module.exports = closeDbConnection;
