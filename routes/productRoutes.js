const express = require('express');
const validateProduct = require('../middleware/validateProduct');
const asyncHandler = require('../utils/asyncHandler');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} = require('../controllers/productController');

const router = express.Router();

// GET all products
router.get('/', asyncHandler(getAllProducts));

// GET product stats (must be before :id)
router.get('/stats', asyncHandler(getProductStats));

// GET product by ID
router.get('/:id', asyncHandler(getProductById));

// POST new product
router.post('/', validateProduct, asyncHandler(createProduct));

// PUT update product
router.put('/:id', validateProduct, asyncHandler(updateProduct));

// DELETE product
router.delete('/:id', asyncHandler(deleteProduct));

module.exports = router;
