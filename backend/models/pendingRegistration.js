const mongoose = require('mongoose');

const pendingRegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Automatically delete after 1 hour
    },
    attempts: {
        type: Number,
        default: 0,
    }
}, { collection: 'UCSC PendingUsers' });

module.exports = mongoose.model('PendingRegistration', pendingRegistrationSchema);
