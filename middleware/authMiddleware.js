const jwt = require('jsonwebtoken');


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

module.exports = { requireAuth };