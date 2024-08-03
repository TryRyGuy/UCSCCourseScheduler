const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');

// Register user
router.post('/register', async (req, res) => {
    const { scheduleId = [], email, password, classId = [], scheduleName = ''} = req.body;
    try {
        const userExists = await User.findone({ email: email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ scheduleId, email, password });
        for (let i = 0; i < 4; i++) {
            const sched = new Schedule({ classId, scheduleName});
            const savedSched = await sched.save();
            user.scheduleId.push(savedSched._id);
            await user.save();
        }
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findone({ email: email, password: password });
        if (!userExists) {
            return res.status(400).json({ message: 'User does not exists' });
        }
        res.status(200).send('User logged in');
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