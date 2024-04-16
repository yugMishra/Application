const express = require('express');
const connectDB = require('./db');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Other middleware and routes
// ...

module.exports = app;