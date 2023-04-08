const mongoose = require('mongoose');
const { listingHooks } = require('./hooks');

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// register the hooks
listingHooks(listingSchema);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
