const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Adjust if your frontend is served from a different URL
    methods: ['GET', 'POST'],
    credentials: true
  }));


// app.use(cors()); // Use cors with default settings
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error(err));

// Define/integrate user Routes for use
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);
