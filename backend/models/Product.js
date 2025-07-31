const mongoose = require('mongoose');

// Define the schema based on the provided CSV columns
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  cost: { type: Number, required: true },
  category: { type: String },
  name: { type: String, required: true },
  brand: { type: String },
  retail_price: { type: Number, required: true },
  department: { type: String },
  sku: { type: String },
  distribution_center_id: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);
