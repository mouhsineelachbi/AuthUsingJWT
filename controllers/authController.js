const User = require('../models/User');

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
        const user = await User.create({
            email,
            password
        })
        res.status(201).json(user);

    } catch(err){
        const error = handleErrors(err);
        res.status(400).json(error);
    }
}

module.exports.login_post = async (req, res)=>{
    res.send('Logiiin');
}