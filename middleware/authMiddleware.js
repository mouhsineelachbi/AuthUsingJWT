const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Checking authentication
const requireAuth = (req, res, next) =>{
    const Token = req.cookies.jwt;

    // Check json web token exists & is verified
    if(Token) {
        jwt.verify(Token, 'this is the secret', (err, decodedToken)=>{
            // Once the jwt had checked
            if (err) { // if there is an error means the token is not valid => Stop and login first
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next(); // Carry on your work
            }
        })
    }
    else {
        res.redirect('/login');
    }
}


// cheking current user

const checkUser = (req, res, next) =>{
    const Token = req.cookies.jwt

    if(Token) {
        jwt.verify(Token, 'this is the secret', async (err, decodedToken)=>{
            // Once the jwt had checked
            if (err) { // if there is an error means the token is not valid => Stop and login first
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; //res.locals.user => user variable will be available to be called from the views
                next(); // Carry on your work
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };