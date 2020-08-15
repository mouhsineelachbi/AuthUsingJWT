const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User;