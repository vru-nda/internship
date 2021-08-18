var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

router.get('/product', function(req, res, next) {
    res.render('product', { title: 'Products' });
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

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
});

router.get('/admin', function(req, res, next) {
    res.render('dashboard', { title: 'Dashboard' });
});

router.get('/add', function(req, res, next) {
    res.render('form', { title: 'Add Products' });
});

router.get('/view', function(req, res, next) {
    res.render('table', { title: 'View Products' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'sign up' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Log in' });
});

router.get('/inbox', function(req, res, next) {
    res.render('inbox', { title: 'Inbox' });
});

router.get('/myform', function(req, res, next) {
    res.render('myform');
});

router.post('/form-process', function(req, res, next) {
    var a = parseInt(req.body.txt1);
    var b = parseInt(req.body.txt2);
    var c = a + b;
    var msg = "";
    var color = "";

    if (c > 80) {
        msg = 'You Passed!';
        color = "green";
    } else {
        msg = 'You failed';
        color = "red";
    }

    res.render('ans', { mya: a, myb: b, myc: c, mymsg: msg, mycolor: color });
});

router.use(function(req, res, next) {
    res.status(404).render('404', { title: 'Page not Found' });
});

router.use(function(req, res, next) {
    res.status(500).render('500', { title: 'Something went wrong!' });
});
module.exports = router;