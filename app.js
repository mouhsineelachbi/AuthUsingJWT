const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser'); // a middleware
const { requireAuth } = require('./middleware/authMiddleware'); // middleware
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://mouhsineelachbi:017100688@cluster0.oa8h1.mongodb.net/nodejwt';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {app.listen(3000); console.log('Listening on port 3000');})
  .catch((err) => console.log(err));

// routes
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// Cookies
/*app.get('/set-cookies', (req, res) => {

  //first method
  res.setHeader('Set-Cookie', 'newUser=true');
  res.send('<h1>You set the cookies!</h1>');


  // Second method using cookie Parser
  res.cookie('newUser', false) // newUser is the name and false is the value
  // maxAge in miliseconds, secure=true=>cookie will be send only if https is used
  // httpOnly: true => we can't access cookie through javascript, and can only explored by http protocole
  res.cookie('isEmployee', true, {maxAge: 1000*60*60*24, httpOnly: true, secure: true});
  res.send('<h1>You set the cookies!</h1>');
})


app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.isEmployee);

  res.json(cookies.newUser);

})*/