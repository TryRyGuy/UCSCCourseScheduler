const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    classes: [
        {
            classId: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'ClassInfo'
            },
            isUsed: {
                type: Boolean,
                default: false,
            }
        }
    ],
    scheduleName: {
        type: String,
    },
}, { collection: 'UCSC Schedules' });

module.exports = mongoose.model('Schedule', scheduleSchema);