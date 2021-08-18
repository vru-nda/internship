var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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


module.exports = router;