let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy; 
let flash = require('connect-flash');

// Database setup
let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');

mongoose.connect(DB.URI);
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Mongo DB is connected")});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Set up session and passport
app.use(session({
  secret: "Somesecret",
  saveUninitialized: false,
  resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
let userModel = require('../models/user');
let User = userModel;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make user object available in all views
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Routes setup
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let itemsRouter = require('../routes/items'); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items-list', itemsRouter);

// Login Route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

// isLoggedIn Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.get('/home', isLoggedIn, (req, res) => {
  res.render('home');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
