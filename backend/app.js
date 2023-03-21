// load .env file here
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Listing = require('./models/Listing');
const { MongoDbError } = require('./lib');

const app = express();

const { MONGODB_URI } = process.env;
const DB_NAME = 'keja_app';

if (!MONGODB_URI) {
  throw new MongoDbError('MONGOGB_URI env variable is not set!');
}

// Middleware
app.use(cors());
app.use(express.json());
app.get('/listings', (req, res) => {
  // handle the request and send a response
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

// Routes
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving listings' });
  }
});

app.post('/api/listings', async (req, res) => {
  const { address, price, bedrooms, bathrooms, size } = req.body;

  const newListing = new Listing({
    address,
    price,
    bedrooms,
    bathrooms,
    size,
  });

  try {
    await newListing.save();
    res.json({ message: 'Listing created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating listing' });
  }
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
