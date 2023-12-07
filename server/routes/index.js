var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// Get Products page
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
});

// Get About page
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});

// Get Login page
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

// Get Login page
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register' });
});

// Get Login page
router.get('/checkout', function(req, res, next) {
  res.render('index', { title: 'Checkout' });
});

// Get Login page
router.get('/order-success', function(req, res, next) {
  res.render('index', { title: 'Order-success' });
});




module.exports = router;

