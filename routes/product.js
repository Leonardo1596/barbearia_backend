const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const ProductController = require('../controllers/ProductController');

router.post('/create_product', verifyToken, ProductController.createProduct);
router.delete('/delete_product/:id', verifyToken, ProductController.deleteProduct);
router.put('/update_product/:id', verifyToken, ProductController.updateProduct);

module.exports = router;