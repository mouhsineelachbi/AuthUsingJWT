const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handling errors
const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    // Duplicate error code
    if(err.code === 11000) {
        errors.email = 'That email has already registered';
        return errors;
    }

    // Validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            console.log(properties.message);
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

// Creating Tokens
const maxAge = 3*24*60*60 // 3 days in seconds
const createToken = (id)=>{
    return jwt.sign({ id }, 'this is the secret', {  // { id } is the payload and the secret is what after, and then the options
        expiresIn: maxAge
    });
}



// Creating Paths

module.exports.signup_get = (req, res)=>{
    res.render('signup');
}

module.exports.login_get = (req, res)=>{
    res.render('login');
}

module.exports.signup_post = async (req, res)=>{
    const { email, password } = req.body;

    // Creating user by his email and password
    try {
        const user = await User.create({ email,password });
        const Token = createToken(user._id); // create the token for the used by Its Id
        res.cookie('jwt', Token, { httpOnly: true, maxAge: maxAge*1000 }) // Send token to be stored in the browser
        res.status(201).json({user: user._id});

    } catch(err){
        const error = handleErrors(err);
        res.status(400).json(error);
    }
}

module.exports.login_post = async (req, res)=>{
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const Token = createToken(user._id); // create the token for the used by Its Id
        res.cookie('jwt', Token, { httpOnly: true, maxAge: maxAge*1000 }) // Send token to be stored in the browser with maxAge = 3days
        res.status(200).json({ user: user._id });
    }catch(err) {
        res.status(400).json({});
    }
}