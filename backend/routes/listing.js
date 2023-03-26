const express = require('express');
const { listingsService } = require('../services');
const { handleJoiValidationError } = require('../lib');

const router = express.Router();

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const { Listing } = req.models;
    const newListing = await listingsService.createListing(req.body);
    const { address, price, bedrooms, bathrooms, size, userId } = newListing.value;
    const listing = new Listing({
      address,
      price,
      bedrooms,
      bathrooms,
      size,
      postedBy: userId,
    });
    await listing.save();
    res.status(201).send(listing);
  } catch (error) {
    const { statusCode, errorMessage } = handleJoiValidationError(error);
    res.status(statusCode).send({ errorMessage, statusCode });
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    console.log({ listings });
    res.send(listings);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting listings');
  }
});

// Get a specific listing by ID
router.get('/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.send(listing);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting listing');
  }
});

// // Create a new user
// router.post('/users', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).send(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error creating user');
//   }
// });

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error getting users');
//   }
// });

// // Get a specific user by ID
// router.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     res.send(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error getting user');
//   }
// });

module.exports = router;
