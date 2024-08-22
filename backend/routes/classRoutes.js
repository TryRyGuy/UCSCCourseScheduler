const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');
const ClassInfo = require('../models/classInfo');

router.get('/addClasses', async (req, res) => {
    const { classId, scheduleId } = req.body;

    try {
        // Ensure the user is logged in and has a session
        if (!req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find the user and their schedules
        const user = await User.findOne({ _id: req.session.user._id }).populate('scheduleId');
        const schedules = user.scheduleId;

        // Find the specific schedule to update
        const specSched = schedules.find(sch => sch._id.equals(scheduleId));

        if (!specSched) {
            return res.status(404).json({ message: 'Schedule not found for the user' });
        }
        const updatedSchedule = await Schedule.findById(specSched);
        if (updatedSchedule) {
            updatedSchedule.classes.push({ classId, isUsed: false });
            await updatedSchedule.save();
        }
        res.status(200).json({ message: 'Class added to schedule', theSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error adding class to schedule', error: error.message });
    }
});

// Get all classes
router.get('/fetchClasses', async (req, res) => {
    const { term } = req.query; // Extracting the term from query parameters
    console.log(term);
    try {
        const classes = await ClassInfo.find({ quarter: term });
        console.log(classes);
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
});

module.exports = router;