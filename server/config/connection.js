const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MongoDB URI is missing. Set the MONGODB_URI environment variable.');
  process.exit(1); // Exit the process if MongoDB URI is not set
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1); // Exit the process on connection error
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;

