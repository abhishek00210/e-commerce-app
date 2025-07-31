require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());

const productRouter = require('./routes/products');
app.use('/api/products', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
