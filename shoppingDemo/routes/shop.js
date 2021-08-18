const express = require('express');

const shopContoller = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopContoller.getIndex);

router.get('/products', shopContoller.getProducts);

router.get('/products/:productId', shopContoller.getProduct);

router.get('/testimonials', shopContoller.getTestimonials);

router.get('/about', shopContoller.getAbout);

router.get('/terms', shopContoller.getTerms);

router.get('/cart', isAuth, shopContoller.getCart);

router.post('/cart', isAuth, shopContoller.postCart);

router.post('/cart-delete-item', isAuth, shopContoller.postCartDelete);

// router.post('/create-order', isAuth, shopContoller.postOrder);

router.get('/orders', shopContoller.getOrders);

router.get('/checkout', shopContoller.getCheckout);

router.get('/checkout/success', shopContoller.getCheckoutSuccess);

router.get('/checkout/cancel', isAuth, shopContoller.getCheckout);

router.get('/orders', isAuth, shopContoller.getOrders);

router.get('/contact', shopContoller.getContact);

router.post('/contact', shopContoller.postContact);

module.exports = router;