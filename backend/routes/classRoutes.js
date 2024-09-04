const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Schedule = require('../models/schedule');
const ClassInfo = require('../models/classInfo');


// Get all classes with filters
router.get('/fetchClasses', async (req, res) => {
    const { term, classTag, comparison, instructor, department, limit = 10 } = req.query; 

    // Building the filter object dynamically
    let filter = {};
    
    if (term) filter.quarter = term;
    if (department) filter.dept = department;
    if (instructor) filter.instructor = { $regex: new RegExp(instructor, 'i') }; // Case-insensitive search

    const classTagNumber = Number(classTag);
    console.log(typeof(classTagNumber));
    if (classTag) {
        if (comparison == 0) {
            filter.classTag = { $lt: classTagNumber };
        } else if (comparison == 1) {
            filter.classTag = classTagNumber;
        } else if (comparison == 2) {
            filter.classTag = { $gt: classTagNumber };
        }
    }

    try {
        //console.log("dept = " + dept);
        // Calculate total number of documents that match the filter
        const totalClasses = await ClassInfo.countDocuments(filter);

        // Calculate total pages needed
        const totalPages = Math.ceil(totalClasses / limit);

        //.sort({ classTag: 1})
        const classes = await ClassInfo.find(filter).sort({ classTag: 1});

        // Return both classes and totalPages
        res.status(200).json({ classes, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
});


router.get('/departments', async (req, res) => { 
    try {
        const departments = await ClassInfo.distinct('dept'); // Assuming 'department' is the field name
        res.status(200).json(departments);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
      }

});

module.exports = router;