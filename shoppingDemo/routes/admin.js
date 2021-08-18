const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// homepage => GET
router.get('/', isAuth, adminController.getAdminIndex);

// admin/products => GET
router.get('/products', isAuth, adminController.getAdminProducts);

// admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// admin/product-process => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

//admin/update route get
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', isAuth, adminController.postEditProduct);

// /admin/delete-product => POST
router.get('/delete-product/:productId', isAuth, adminController.getDeleteProduct);

// /admin/delete-product => POST
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;