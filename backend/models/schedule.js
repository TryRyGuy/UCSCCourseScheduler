const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    classId: {
        type: [String],
    },
    scheduleName: {
        type: String,
        required: true,
    },
}, { collection: 'UCSC Schedules' });

module.exports = mongoose.model('schedule', scheduleSchema);