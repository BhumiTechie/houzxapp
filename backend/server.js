// server.js

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Assuming this file contains the MongoDB connection logic
const app = require('./app'); // Import the app from app.js

// Load environment variables from the .env file
dotenv.config();

// Connect to MongoDB (if you have a separate function for DB connection)
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
