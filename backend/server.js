const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors
const session = require('express-session');  // Import express-session
const MongoStore = require('connect-mongo');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse cookies
app.use(cookieParser());  // Use cookie-parser

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Adjust if your frontend is served from a different URL
    methods: ['GET', 'POST'],
    credentials: true
}));

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use a strong, random string from environment variables
    resave: false, // Prevents resaving session if nothing has changed
    saveUninitialized: false, // Prevents saving uninitialized sessions
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
        // ^ This may cause issues when TESTING IN DEVELOPMENT. REFER BACK TO THIS IF SESSION DATA NOT ACCESSIBLE AT FIRST
        maxAge: 1000 * 60 * 60 * 24 // 1 day, adjust as needed
    }
}));

// CSRF protection middleware
app.use(csurf({ cookie: true }));

// Middleware to handle CSRF token errors
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403);
    res.send('Form tampered with.');
});

// Simple route to send CSRF token to the client
app.get('/api/csrf-token', (req, res) => {
    console.log(req.csrfToken());
    const csrfToken = req.csrfToken();
    console.log(csrfToken);
    res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false });
    res.status(200).json({ csrfToken });
});

// app.use(cors()); // Use cors with default settings
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Define/integrate user Routes for use
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

// Session route to check if the user is logged in
app.get('/api/session', (req, res) => {
    console.log("in server");
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
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
