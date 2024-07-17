// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error(err));

// Define/integrate user Routes for use
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);