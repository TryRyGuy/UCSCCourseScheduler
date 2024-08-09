const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');

/*// Fetch CSRF token
router.get('/csrf-token', (req, res) => {
    res.status(200).json({ csrfToken: req.csrfToken() });
});*/

// Register user
router.post('/register', async (req, res) => {
    const { scheduleId = [], email, password, classId = [], scheduleName = ''} = req.body;
    try {
        const userExists = await User.findOne({ email: email });
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
    console.log("start");
    const { email, password } = req.body; // _csrf is implicitly checked by csurf middleware
    console.log("extracted email and password")
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        console.log("user found");
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session regeneration failed' });
            }
            req.session.user = user; // Store user data in session
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Session save failed' });
                }
                res.status(200).json({ message: 'User logged in', user, csrfToken: req.csrfToken() }); // Send new CSRF token
            });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
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

// Middleware to check if the user is authenticated
router.get('/auth-check', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ authenticated: true, user: req.session.user });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;