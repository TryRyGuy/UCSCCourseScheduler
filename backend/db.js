const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://TryRyGuy:JRCN4FAANG!@primaryschedulerdb.zjerog4.mongodb.net/?retryWrites=true&w=majority&appName=PrimarySchedulerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;