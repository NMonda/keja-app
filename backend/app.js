// load .env file here
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoDbError } = require('./lib');
const { listingRoutes, userRoutes } = require('./routes');
const models = require('./models');

const app = express();

const { MONGODB_URI } = process.env;
const DB_NAME = 'keja_app';

// sanity check
if (!MONGODB_URI) {
  throw new MongoDbError('MONGOGB_URI env variable is not set!');
}

// Middleware
app.use(cors());
app.use(express.json());

// register all models (kinda like auto-import them)
app.use(async (req, res, next) => {
  req.models = models;

  await next();
});

// Connect to MongoDB
mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// serve the routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/listings', listingRoutes);

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
