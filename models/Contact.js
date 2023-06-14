const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String, 
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    modified_date: {
        type: Date,
        default: null,
    }
});

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;