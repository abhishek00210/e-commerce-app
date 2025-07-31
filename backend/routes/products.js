const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Route to get a list of all products with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    
    res.json({
      total: totalProducts,
      page: page,
      limit: limit,
      data: products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single product by its ID from the CSV data
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // Convert the ID from URL to a number

    // Check if the ID is a valid number
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const product = await Product.findOne({ id: productId }); // Find by the 'id' field from CSV
    
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
