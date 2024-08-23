const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');

router.get('/getSchedules', async (req, res) => {
    try {
      // Assuming user is authenticated and we have user ID in req.session.user
      const userId = req.session.user.id;
      const user = await User.findById(userId).populate('scheduleId');
      scheduleList = user.scheduleId;
      
      const schedules = {
        Fall: scheduleList[0]?.classes || null,
        Winter: scheduleList[1]?.classes || null,
        Spring: scheduleList[2]?.classes || null,
        Summer: scheduleList[3]?.classes || null,
      };
      const classCounts = {
        Fall: scheduleList[0]?.classes.length || 0 ,
        Winter: scheduleList[1]?.classes.length || 0 ,
        Spring: scheduleList[2]?.classes.length || 0 ,
        Summer: scheduleList[3]?.classes.length || 0 ,
    };

      return res.json({ schedules, classCounts });
  } catch (error) {
      console.error('Error fetching schedules:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/addClass', async (req, res) => {
  const { classId, term } = req.body; // Term should already be converted to lowercase
    const userId = req.session.user.id;
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Map term to schedule index
        const termIndex = {
            fall: 0,
            winter: 1,
            spring: 2,
            summer: 3
        }[term];
        const scheduleId = user.scheduleId[termIndex];
        // Find the corresponding schedule by ID
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // Check if the class already exists in the schedule
        const classExists = schedule.classes.some((entry) => entry.classId === classId);
        if (classExists) {
            return res.status(400).json({ message: 'Class is already in the schedule for the selected term.' });
        }

        // Check if the schedule already has 15 classes
        if (schedule.classes.length >= 15) {
            return res.status(400).json({ message: 'Schedule is full. Cannot add more classes. Please empty some of your cart and try again' });
        }

        // Add the new class to the schedule
        schedule.classes.push({ classId, isUsed: false });
        await schedule.save();

        // Return success message
        res.status(200).json({ message: 'Class added successfully', schedule: schedule.classes });

    } catch (error) {
        console.error('Error adding class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/dropClasses', async (req, res) => {
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
          updatedSchedule.classes = updatedSchedule.classes.filter(cls => cls.classId.toString() !== classId.toString());
          await updatedSchedule.save();
      }
      res.status(200).json({ message: 'Class added to schedule', theSchedule });
  } catch (error) {
      res.status(500).json({ message: 'Error adding class to schedule', error: error.message });
  }
});

module.exports = router;