const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const machineDataRoutes = require('./routes/machineDataRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sampledata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Use routes
app.use('/api', machineDataRoutes);

module.exports = app;
