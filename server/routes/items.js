let express = require('express');
let router = express.Router();
let Items = require('../models/items');

router.get('/', async (req, res, next) => {
  try {
      const itemsList = await Items.find();
      res.render('Cart/items-list', {
          title: 'Cart',
          itemsList: itemsList
      });
  } catch (err) {
      console.error(err);
      res.render('Cart/items-list', {
          title: 'Error',
          error: err.message
      });
  }
});

router.post('/add-to-cart', async (req, res) => {
  try {
      const { Name, Price, Color } = req.body;

      let newItem = new Items({
          Name: Name,
          Price: parseFloat(Price),
          Colour: Color
      });

      await newItem.save();

      res.redirect('/items-list');
  } catch (err) {
      console.error(err);
      res.status(500).send("Error saving item to the database: " + err.message);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
      const itemId = req.params.id;

      const result = await Items.deleteOne({ _id: itemId });

      if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: "Item not found" });
      }

      res.json({ success: true });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error deleting item: " + err.message });
  }
});

module.exports = router;
