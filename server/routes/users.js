var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user'); // Adjust this path to where your User model is located

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Registration route
router.post('/register', function(req, res) {
  const { username, password, displayName } = req.body;
  User.register(new User({ username, displayName }), password, function(err, user) {
    if (err) {
      console.log("Registration error:", err); // Log any errors
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function () {
      req.flash('success', 'Successfully registered!'); // Flash a success message
      res.redirect('/login'); // Redirect after successful registration
    });
  });
});


// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/products', // Redirect to a home page or profile page
  failureRedirect: '/login', // Redirect back to login page
  failureFlash: true // Assuming flash messages are configured
}));

// Logout route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});




/*
router.get('/login', function(req, res) {
  res.render('login', { 
    'error': req.flash('error'), 
    'success': req.flash('success') 
  });
});
*/

module.exports = router;
