const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', upload, productController.addProduct);

module.exports = router;