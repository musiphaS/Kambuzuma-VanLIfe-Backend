const mongoose = require('mongoose');
const vanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Price must be greater than 0',
        },
    },
    description: {
        type: String,
        required: true,
    },
    button: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        // Add image validation logic here
    },
    available: { 
        type: Boolean, 
        default: true 
    },
});

const van = mongoose.model('vans', vanSchema);

module.exports = van;