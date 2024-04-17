const mongoose = require('mongoose');

const sampleDataSchema = new mongoose.Schema({
    ts: {
        type: Date,
        required: true
    },
    machine_status: {
        type: Number,
        required: true
    },
    vibration: {
        type: Number,
        required: true
    }
});

const SampleData = mongoose.model('SampleData', sampleDataSchema);

module.exports = SampleData;
