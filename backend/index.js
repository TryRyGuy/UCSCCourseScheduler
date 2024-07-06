const express = require('express');
const mongoose = require('./db'); // Assuming db.js is in the same directory

const app = express();

// Example route
app.get('/', (req, res) => {
  // Example database query
  const User = mongoose.model('User', { name: String });
  
  User.find((err, users) => {
    if (err) return console.error(err);
    res.json(users);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});