const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,  //regex to parse or validate email
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);

