const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

// Fire a function after new doc is saved to db
userSchema.post('save', function (doc, next){ // post = after the 'save' event occurs fire that function, doc = the doc which is saved
// and next is a method to go to the next middleweare in the stack
// if the next doesn't implemented then we will have a response problem
// next() is always required for mongoose middleWare or hooks
    console.log('New user was created and saved', doc);
    next();
});


// Fire a function before the doc saved to db
/*userSchema.pre('save', function(next) { // We used 'function' instead of arrow function to have values available when we call 'this'
    console.log('user is about to be created and saved', this); // 'this' refer to the USER
    next();
});*/

// We're using bcrypt to hash the password and save them in the db
// we're generating a salt and attach It to password (eg: test123 => hAgfetest123)
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(); // generate a salt which is asynch function
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;