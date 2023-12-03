let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// for the authentication written by Barnabas Daniel and Ciaran
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy; 

// Database setup
let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');
//mongoose.connect('mongodb://127.0.0.1:27017/shoppingCart');

mongoose.connect(DB.URI); // Connect to MongoDB using the URI provided in DB module
mongoDB.on('error',console.error.bind(console,'Connection Error')); // Log an error if the database connection fails
mongoDB.once('open',()=>{console.log("Mongo DB is connected")}); // Log a message when the database connection is successfully opened

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let itemsRouter = require('../routes/items'); // importing Router for items router


let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set up Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items-list', itemsRouter); // Routes for cart page under '/items-list'
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Implement login logic here using Passport
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
  })
);

app.get('/home', isLoggedIn, (req, res) => {
  res.send('Home Page');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
