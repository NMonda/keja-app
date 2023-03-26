const express = require('express');
const { listingsService } = require('../services');
const { handleJoiValidationError } = require('../lib');
const { Listing } = require('../models');

const router = express.Router();

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const { Listing } = req.models;
    const newListing = await listingsService.createListing({ model: Listing, payload: req.body });
    res.status(201).send(newListing);
  } catch (error) {
    const { statusCode, errorMessage } = handleJoiValidationError(error);
    res.status(statusCode).send({ errorMessage, statusCode });
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await listingsService.getAllListings(Listing);
    res.send(listings);
  } catch (error) {
    res.status(422).send(error.message);
  }
});

// Get a specific listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await listingsService.retrieveListingById({
      model: Listing,
      listingId: req.params.id,
    });
    
    if (!listing) {
      return res.status(404).send(`No listing with id ${req.params.id} found`);
    }
    res.send(listing);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
