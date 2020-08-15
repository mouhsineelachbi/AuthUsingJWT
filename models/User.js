const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, 'minimum password length is 6 characters'],
        required: [true, 'Please enter a password'],
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User;