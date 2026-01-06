const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set. Skipping MongoDB connection (dev mode).');
    return;
  }

  // For Mongoose v6+ the legacy options (useNewUrlParser, useUnifiedTopology)
  // are enabled by default or removed; pass no driver-specific options here.
  mongoose.set('strictQuery', false);

  mongoose
    .connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      // Do not exit; allow server to start so frontend can be tested in dev.
    });
};
