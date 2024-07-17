const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;
   try {
       const user = new User({ name, email, password });
       await user.save();
       res.status(201).send('User registered');
   } catch (error) {
       res.status(400).send(error.message);
   }
});

// Get all users
router.get('/', async (req, res) => {
   try {
       const users = await User.find();
       res.json(users);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

module.exports = router;