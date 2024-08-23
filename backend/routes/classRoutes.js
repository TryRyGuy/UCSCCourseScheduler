const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');
const ClassInfo = require('../models/classInfo');


// Get all classes
router.get('/fetchClasses', async (req, res) => {
    const { term } = req.query; // Extracting the term from query parameters
    
    try {
        const classes = await ClassInfo.find({ quarter: term });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
});

module.exports = router;