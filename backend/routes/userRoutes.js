const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const PendingRegistration = require('../models/pendingRegistration');
const { registerLimiter } = require('../server'); // Adjust the path as necessary
//console.log(registerLimiter);


// Register user
router.post('/register', async (req, res) => {
    const { scheduleId = [], email, password, classes = [], scheduleName = '' } = req.body;
    try {
        if (!email.endsWith('@ucsc.edu')) {
            return res.status(400).json({ message: 'Invalid email. Please use a valid UCSC email address.' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password before saving
        //const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password });
        schedules = []
        for (let i = 0; i < 4; i++) {
            const sched = new Schedule({ classes, scheduleName });
            const savedSched = await sched.save();
            schedules.push(savedSched._id);
        }
        user.scheduleId = schedules;
        await user.save();
        
        console.log("user created");

        // Session regeneration
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session regeneration failed' });
            }
            req.session.user = { id: user._id, email: user.email }; // Store user data in session
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Session save failed' });
                }
                res.status(201).send({message: 'User registered', user: { id: user._id, email: user.email } });
            });
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//NOTE: EXPLORE STORING USER ID IN SESSION RATHER THAN USER OBJECT ITSELF
// MORE SPACE EFFICIENT AND NOT RISKING EXPOSING PASSWORDS TO Javascript ATTACKS (XSS)

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // _csrf is implicitly checked by csurf middleware
    try {
        const user = await User.findOne({ email});
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Incorrect email and/or password' });
        }
        console.log("user found");
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session regeneration failed' });
            }
            req.session.user = { id: user._id, email: user.email }; // Only store necessary data
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

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Get all users
router.get('/getUsers', async (req, res) => {
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

/*
// Generate a verification code
const generateVerificationCode = () => {
    return crypto.randomBytes(20).toString('hex');
};

// This helper function sends the verification email through nodemailer
const sendVerificationEmail = async (email, verificationCode) => {
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass:', process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by entering the following code: ${verificationCode}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

// Registration route with rate limiting
router.post('/register', registerLimiter, async (req, res) => {

    const { email, password } = req.body;

    // Email validation
    if (!email.endsWith('@ucsc.edu')) {
        return res.status(400).json({ message: 'Invalid email. Please use a UCSC email address.' });
    }

    // Check if email is in use, reject if so
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    // Rate limiting and reCAPTCHA checks...
    console.log("making entry");
    try {
        console.log("making code");
        // Generate verification code
        const verificationCode = generateVerificationCode();
        console.log("made code, now checking for existing new user");
        // Check if a pending registration exists
        let pendingUser = await PendingRegistration.findOne({ email });

        console.log("user check done, now deciding");
        if (pendingUser) {
            // If a pending registration exists, update the existing entry
            pendingUser.password = password;
            pendingUser.verificationCode = verificationCode;
            pendingUser.createdAt = Date.now();  // This will reset the TTL
        } else {
            // If not, create a new pending registration
            pendingUser = new PendingRegistration({
                email: email,
                password: password,
                verificationCode: verificationCode,
            });
        }
        console.log("user made/updated, now saving");
        await pendingUser.save();

        console.log("user saved, sending email");
        // Send the verification email
        await sendVerificationEmail(email, verificationCode);
        
        console.log("email sent, now returning");
        res.status(201).json({ message: 'Verification email sent. Please check your email.' });

    } catch (error) {
        res.status(500).json({ message: 'Error creating pending registration' });
    }
});

router.post('/verify-email', async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const pendingUser = await PendingRegistration.findOne({ email });

        if (pendingUser.verificationCode !== verificationCode) {
            pendingUser.attempts = (pendingUser.attempts || 0) + 1;

            if (pendingUser.attempts >= 5) {
                // Max attempts reached, delete the pending registration
                await PendingRegistration.deleteOne({ email });
                return res.status(400).json({ message: 'Too many incorrect attempts. Please return to the registration page and try again.' });
            }

            // Save the incremented attempts count
            await pendingUser.save();
            return res.status(401).json({ message: 'Invalid or expired verification code' });
        }

        // Create the user account
        const user = new User({
            email: pendingUser.email,
            password: pendingUser.password,
        });

        await user.save();

        // Delete pending registration
        await PendingRegistration.deleteOne({ email });

        // Regenerate session and store user ID/email only
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session regeneration failed' });
            }
            req.session.user = { id: user._id, email: user.email }; // Store only necessary data
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Session save failed' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Error verifying email' });
    }
});
*/