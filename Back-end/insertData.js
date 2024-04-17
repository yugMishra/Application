const mongoose = require('mongoose');
const SampleData = require('./models/SampleData'); // Import the SampleData model

// Set up a connection to your MongoDB database
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/sampledata';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Function to insert data into the SampleData collection
const insertData = async () => {
    try {
        // Create a new document using the SampleData model
        const newData = new SampleData({
            ts: new Date(), // Current timestamp
            machine_status: 0, // Sample machine status
            vibration: 1111 // Sample vibration level
        });

        // Save the new document to the database
        const savedData = await newData.save();

        // Verify the save operation
        console.log('Document saved successfully:', savedData);
    } catch (error) {
        // Handle any errors that occur during the save operation
        console.error('Error inserting data:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Run the data insertion function
insertData();
