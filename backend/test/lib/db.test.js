const mongoose = require('mongoose');
const { expect, lib, errors } = require('../setup');

const { Db } = lib;

const { MONGODB_URI } = process.env;

describe('Db', () => {
  describe('#connect', () => {
    it('creates a new instance of the DB', async () => {
      const db = new Db(`${MONGODB_URI}/sample_keja_app_db`);
      await db.connect();

      const isOn = await db.isConnected();

      expect(isOn).to.eq(true);
      expect(mongoose.connection.db.databaseName).to.match(/sample_keja_app_db/i);

      // disconnect
      await db.disconnect();
    });
  });

  describe('#disconnect', () => {
    it('removes any connection created', async () => {
      const db = new Db(`${MONGODB_URI}/sample_keja_app_db`);
      await db.connect();

      const isOn = await db.isConnected();

      expect(isOn).to.eq(true);
      expect(mongoose.connection.db.databaseName).to.match(/sample_keja_app_db/i);

      // disconnect
      await db.disconnect();

      const stillOn = await db.isConnected();
      expect(stillOn).to.eq(false);
    });
  });
});
