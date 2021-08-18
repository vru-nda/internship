var express = require('express');
var router = express.Router();
var db = require('connection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

router.get('/products', function(req, res, next) {
    res.render('products', { title: 'Products' });
});

router.get('/product-details', function(req, res, next) {
    res.render('product-details', { title: 'Product-details' });
});

router.get('/checkout', function(req, res, next) {
    res.render('checkout', { title: 'Checkout' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About Us' });
});

router.get('/terms', function(req, res, next) {
    res.render('terms', { title: 'Terms' });
});

router.get('/testimonials', function(req, res, next) {
    res.render('testimonials', { title: 'testimonials' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
});

router.post('/contact-process', function(req, res, next) {

    const myInfo = {
        name: req.body.name,
        email: req.body.email,
        msg: req.body.message,
    }

    connection.query("INSERT into tbl_contact set ?", myInfo, function(err, result) {
        if (err) throw err;
        res.redirect('/');
    });
});


router.use(function(req, res, next) {
    res.status(404).render('404', { title: 'Page not Found' });
});

router.use(function(req, res, next) {
    res.status(500).render('500', { title: 'Something went wrong!' });
});
module.exports = router;