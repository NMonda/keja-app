const express = require('express');
const { listingsService } = require('../services');

const router = express.Router();

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const { Listing } = req.models;
    const newListing = await listingsService.createListing({ model: Listing, payload: req.body });
    const hasStatusCode = Object.prototype.hasOwnProperty.call(newListing, 'statusCode');

    // dealing with a success scenario
    if (!hasStatusCode) {
      return  res.status(201).send(newListing);
    }

    const { errorMessage, statusCode } = newListing;
    return res.status(statusCode).send({ errorMessage });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const { Listing } = req.models;
    const listings = await listingsService.getAllListings(Listing);
    res.send(listings);
  } catch (error) {
    res.status(422).send(error.message);
  }
});

// Get a specific listing by ID
router.get('/:listingId', async (req, res) => {
  try {
    const { Listing } = req.models;
    const listing = await listingsService.retrieveListingById({
      model: Listing,
      listingId: req.params.listingId,
    });
    
    if (!listing) {
      return res.status(404).send(`No listing with id ${req.params.listingId} found`);
    }

    const hasStatusCode = Object.prototype.hasOwnProperty.call(listing, 'statusCode');

    if (!hasStatusCode) {
      return res.send(listing);
    }

    const { errorMessage, statusCode } = listing;
    return res.status(statusCode).send(`${errorMessage}: ${req.params.listingId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
