// Description: This file holds the schema for the Message object for the Buddiey app

// Import our libraries
const mongoose = require('mongoose');

// Create our new schema
const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isBuddy: {
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const model = mongoose.Model('Message', messageSchema);

// Export the model
module.exports = model;