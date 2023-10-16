const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop/shopController');
router.get('/profile1',shopController.getProfile1);
router.get('/products',shopController.getProducts);
router.get('/cart', shopController.getCart);

module.exports=router;