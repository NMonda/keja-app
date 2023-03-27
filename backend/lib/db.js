const mongoose = require('mongoose');

const { NODE_ENV } = process.env;

mongoose.connection.on('error', (error) => {
  console.error(`Could not to MongoDB: ${error.message}`);
});

mongoose.connection.on('open', (error) => {
  if (error) {
    console.error(`Could not to MongoDB: ${error.message}`);
  }

  // avoid logging in a test environment, otherwise you will convolute your terminal.
  if (NODE_ENV !== 'test') {
    const mongoClient = mongoose.connection.getClient();
    console.log(`Connected to MongoDB URL: "${mongoClient.s.url}"`);
  }
});

class Db {
  constructor(url) {
    this.url = url;
  }

  // instance methods
  async connect() {
    try {
      const options = { useNewUrlParser: true, useUnifiedTopology: true };
      await mongoose.connect(this.url, options);
    } catch (error) {
      console.error('[DB:connect]', error);
    }
  }

  async isConnected() {
    return mongoose.connection.readyState === 1;
  }

  async disconnect() {
    try {
      if (this.isConnected()) {
        await mongoose.disconnect();

        if (NODE_ENV !== 'test') {
          console.log('[DB:disconnect] Mongoose connection closed successfully');
        }
      }
    } catch (error) {
      console.error(`[DB:disconnect] Could not close Mongoose connection: ${error.message}`);
    }
  }

  async dropDatabase() {
    try {
      if (this.isConnected()) {
        await mongoose.connection.dropDatabase();

        if (NODE_ENV !== 'test') {
          console.log('[DB:dropDatabase] Db dropped successfully');
        }
      }
    } catch (error) {
      console.error(`[DB:dropDatabase] Could not drop Db: ${error.message}`);
    }
  }
}

module.exports = Db;
