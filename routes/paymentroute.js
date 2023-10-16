const path = require('path');
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

const paymentController = require('../controllers/payment/script');

router.post('/createorder', paymentController.createOrder);
router.post('/payment-verify', paymentController.paymentVerify);

module.exports = router;