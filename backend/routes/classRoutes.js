const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');
const Class = require('../models/classInfo');

router.get('/addClasses', async (req, res) => {
    const { classId, scheduleId } = req.body;

    try {
        // Ensure the user is logged in and has a session
        if (!req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find the user and their schedules
        const user = await User.findOne({ _id: req.session.user._id }).populate('scheduleId');


        // Find the specific schedule to update
        const schedule = user.scheduleId.find(sch => sch._id.toString() === scheduleId);

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // Add the new class to the schedule
        schedule.classes.push({ classId: classId, isUsed: false });

        // Save the updated schedule
        await schedule.save();

        res.status(200).json({ message: 'Class added to schedule', schedule });
    } catch (error) {
        res.status(500).json({ message: 'Error adding class to schedule', error: error.message });
    }
});

// Get all classes
router.get('/getClasses', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});