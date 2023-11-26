let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

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
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items-list', itemsRouter); // Routes for cart page under '/items-list'
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
