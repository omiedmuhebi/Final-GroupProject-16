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




module.exports = router;


/*
router.post('/add-to-cart', async (req, res, next) => {
  try {
      let newItem = new Item({ // Create a new assignment object
          "Name": req.body.Name,
          "Price": req.body.Price,
          "Colour": req.body.Colour
      });
      await Item.create(newItem); // Save the new assignment to the database
      res.redirect('/Items-list'); // Redirect to the assignments list page
  } catch (err) {
      console.error(err); // Log any errors encountered
      res.render('Cart/items-list', { // Render error view in case of an error
          error: 'Error on the server'
      });
  }
});
*/

module.exports = router;
