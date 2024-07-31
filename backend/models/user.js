const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    scheduleId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'UCSC Users' });

module.exports = mongoose.model('User', usersSchema);
