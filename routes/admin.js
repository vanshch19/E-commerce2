const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin/script');
// /add-product
router.get('/addproduct',adminController.getAddProduct);
router.post('/addproduct',adminController.postAddProduct);
router.get('/products',adminController.getProducts);

router.get('/remove', adminController.getRemoveProduct); // removing added products
router.get('/updateproduct', adminController.getUpdateProduct);
router.post('/updateproduct', adminController.postUpdateProduct);


module.exports=router;