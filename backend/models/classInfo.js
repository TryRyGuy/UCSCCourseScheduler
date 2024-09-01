const mongoose = require('mongoose');

const classInfoSchema = new mongoose.Schema({
    dept: {
        type: String,
    },
    classTag: {
        type: String,
    },
    sectionNumber: {
        type: String,
    },
    className: {
        type: String,
    },
    classDays: {
        type: Map,
        of: String
    },
    instructor: {
        type: String,
    },
    quarter: {
        type: String,
    },
}, { collection: 'UCSC Class Info' });

module.exports = mongoose.model('ClassInfo', classInfoSchema);