const path = require('path');
const express = require('express');
const router = express.Router();
const userFunctionalityController = require('../controllers/userFunctionality/script');

const wait = require('../middlewares/wait');

router.get('/passwordchange',userFunctionalityController.getPasswordChange); // password change page will appear
router.post('/passwordchange', userFunctionalityController.postPasswordChange);
router.get('/addtocart', wait, userFunctionalityController.getAddToCart);
router.get('/cartitems', userFunctionalityController.getCartItems);
router.get('/incrementqty', wait, userFunctionalityController.getIncrementQty);
router.get('/decrementqty', wait, userFunctionalityController.getDecrementQty);
router.get('/removeproduct', userFunctionalityController.getRemoveCartProduct); // removing cart products
router.get('/products', userFunctionalityController.getProducts);
router.get('/wishlist', userFunctionalityController.getWishlist);
router.post('/wishlist/:productId', userFunctionalityController.postWishlist);



// products pages
router.get('/certainprod', userFunctionalityController.getCertainProd);
router.get('/profilesearch/:text', userFunctionalityController.getResults);


module.exports=router;