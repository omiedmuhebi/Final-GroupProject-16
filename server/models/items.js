let mongoose = require('mongoose'); // Import the mongoose module

// Create a model class
let itemModel = mongoose.Schema({ 
    Name: String, 
    Price: Number,  
    Colour: String   
},
{
    collection: "items" // Specify the collection name in the database
});

module.exports = mongoose.model('items', itemModel); // Export the model, making it accessible to other parts of the application
