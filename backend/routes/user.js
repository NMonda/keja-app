const express = require('express');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { User } = req.models;
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user');
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const { User } = req.models;
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting users');
  }
});

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { User } = req.models;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting user');
  }
});

module.exports = router;
