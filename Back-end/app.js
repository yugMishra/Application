//app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const machineDataRoutes = require('./routes/machineDataRoutes'); // Import your routes

// Create an instance of Express
const app = express();

// Middleware configuration
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB (using an environment variable or fallback)
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/sampledata';
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Mount your routes
app.use('/api', machineDataRoutes);

module.exports = app; // Export the Express app
