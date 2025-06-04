const { v4: uuidv4 } = require('uuid');
const Product = require('../models/Product');

// Get all products with filtering, searching, sorting, and pagination
const getAllProducts = async (req, res) => {
  try {
    const queryObj = {};
    const { name, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;

    // Filtering
    if (category) {
      queryObj.category = category;
    }

    if (minPrice || maxPrice) {
      queryObj.price = {};
      if (minPrice) queryObj.price.$gte = Number(minPrice);
      if (maxPrice) queryObj.price.$lte = Number(maxPrice);
    }

    // Search by name (partial, case-insensitive)
    if (name) {
      queryObj.name = { $regex: name, $options: 'i' };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Sorting
    let sortBy = {};
    if (sort) {
      const sortFields = sort.split(',').join(' ');
      sortBy = sortFields;
    }

    const products = await Product.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
      return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      inStock
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, inStock },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product stats by category
const getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          averagePrice: { $avg: '$price' },
          totalProducts: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { totalProducts: -1 } }
    ]);

    res.status(200).json({ count: stats.length, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
};
