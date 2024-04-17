const express = require('express');
const router = express.Router();
const SampleData = require('../models/SampleData');

// Fetch all machine data
router.get('/sampledata', async (req, res) => {
    try {
        const data = await SampleData.find().sort({ ts: 1 });
        res.json(data);
    } catch (error) {
        console.error('Error fetching sample data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Filter machine data by time range
router.get('/sampledata/filter', async (req, res) => {
    const { startTime, endTime } = req.query;
    try {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const data = await SampleData.find({
            ts: { $gte: start, $lte: end }
        }).sort({ ts: 1 });
        res.json(data);
    } catch (error) {
        console.error('Error filtering sample data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
