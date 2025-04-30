// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Assuming you have routes in a separate file

const app = express();

// Middleware
app.use(cors());          // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Automatically parse incoming JSON data

// Routes
app.use('/auth', authRoutes); // Attach the authentication routes to `/auth` endpoint

module.exports = app; // Export the app to use in server.js
