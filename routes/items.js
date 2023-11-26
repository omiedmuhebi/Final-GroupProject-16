// Importing necessary modules
let express = require('express');            // Import Express framework
let router = express.Router();               // Create a new Express Router
let Items = require('../models/items');      // Import the Items model for database operations

// READ Operation: Get all items
router.get('/', async (req, res, next) => {
  try {
      const itemsList = await Items.find(); // Asynchronously fetch all items from the database
      res.render('Cart/items-list', {       // Render the items list view using EJS
          title: 'Cart',                    // Pass 'Cart' as title to the view
          itemsList: itemsList              // Pass the retrieved items list to the view
      });
  } catch (err) {
      console.error(err);                   // Log the error if there's a problem in fetching items
      res.render('Cart/items-list', {       // Render the error view
          title: 'Error',                   // Pass 'Error' as title to the view
          error: err.message                // Pass the error message to the view
      });
  }
});

// CREATE Operation: Add a new item to the cart
router.post('/add-to-cart', async (req, res) => {
  try {
      const { Name, Price, Color } = req.body; // Extract item details from the request body

      let newItem = new Items({                // Create a new item instance
          Name: Name,                          // Set the item name
          Price: parseFloat(Price),            // Parse and set the item price
          Colour: Color                        // Set the item colour
      });

      await newItem.save();                    // Asynchronously save the new item to the database

      res.redirect('/items-list');             // Redirect to the items list page
  } catch (err) {
      console.error(err);                      // Log the error if there's a problem in saving the item
      res.status(500).send("Error saving item to the database: " + err.message); // Send an error response
  }
});

// DELETE Operation: Remove an item from the cart
router.delete('/delete/:id', async (req, res) => {
  try {
      const itemId = req.params.id;            // Get the item ID from the request parameters

      const result = await Items.deleteOne({ _id: itemId }); // Asynchronously delete the item by its ID

      if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: "Item not found" }); // Send a 404 response if no item was deleted
      }

      res.json({ success: true });             // Send a success response
  } catch (err) {
      console.error(err);                      // Log the error if there's a problem in deleting the item
      res.status(500).json({ success: false, message: "Error deleting item: " + err.message }); // Send an error response
  }
});

// Export the router
module.exports = router; // Make the router available for import in other files
