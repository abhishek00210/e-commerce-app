const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const loadData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully.');

    await Product.deleteMany({});
    console.log('Existing products cleared from the collection.');

    const products = [];
    const csvPath = path.resolve(__dirname, '../products.csv');
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        products.push({
          id: parseInt(data.id),
          cost: parseFloat(data.cost),
          category: data.category,
          name: data.name,
          brand: data.brand,
          retail_price: parseFloat(data.retail_price),
          department: data.department,
          sku: data.sku,
          distribution_center_id: parseInt(data.distribution_center_id)
        });
      })
      .on('end', async () => {
        await Product.insertMany(products);
        console.log(`Successfully loaded ${products.length} products.`);
        
        mongoose.connection.close();
      });
  } catch (error) {
    console.error('Error during data loading:', error);
    mongoose.connection.close();
  }
};

loadData();
