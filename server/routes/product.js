const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { getProducts, addProducts, updateProduct, deleteProduct, getProductById } = require('../controller/display');

router.get('/main', protect, getProducts);
router.post('/main', protect, addProducts);
router.put('/main/:id', protect, admin, updateProduct);
router.delete('/main/:id', protect, admin, deleteProduct);
router.get('/product/:id', protect, getProductById);

module.exports = router;