const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,  
        trim: true,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);

