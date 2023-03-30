const express = require('express');
const cors = require('cors');
const { MongoDbError } = require('../errors');
const { listingRoutes, userRoutes, heartbeatRoute } = require('../routes');
const models = require('../models');
const Db = require('./db');

const { MONGODB_URI } = process.env;

const DB_NAME = process.env.DB_NAME || 'keja_app_dev';

async function createApp() {
  try {
    if (!MONGODB_URI) {
      throw new MongoDbError('MONGOGB_URI env variable is not set!');
    }

    const app = express();

    // register Middleware
    app.use(cors());
    app.use(express.json());

    app.use(async (req, res, next) => {
      req.models = models;

      await next();
    });

    // register PUBLIC routes
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/listings', listingRoutes);
    app.use('/', heartbeatRoute);
    app.use('/heartbeat', heartbeatRoute);

    // start DB connection
    const db = new Db(`${MONGODB_URI}/${DB_NAME}`);
    await db.connect();

    return app;
  } catch (error) {
    console.log(`[createApp] could not create Express app: ${error.message}`);
    process.exit(1);
  }
}

module.exports = createApp;
