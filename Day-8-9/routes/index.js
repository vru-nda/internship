const { enabled } = require('debug');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeDemo'
});

connection.connect(function(err) {
    if (!err) {
        console.log('DB connected!')
    } else {
        console.log(err);
    }
});

/* ------- First table ------*/
//display route
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM tbl_product', function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('index1', { db_rows_array: db_rows });
    });
});


//create Route
router.get('/add', function(req, res, next) {
    res.render('add-product');
});

router.post('/product-process', function(req, res, next) {
    const myData = {
        name: req.body.txt1,
        details: req.body.txt2,
        price: req.body.txt3
    }
    connection.query("INSERT into tbl_product set ?", myData, function(err, result) {
        if (err) throw err;
        res.redirect('/');
    });
});


//read route
router.get('/read/:id', function(req, res, next) {
    editId = req.params.id;
    console.log(editId);
    connection.query('SELECT * FROM tbl_product WHERE id = ?', [editId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('read-product', { db_rows_array: db_rows });
    });
});

//update route get
router.get('/edit/:id', function(req, res, next) {
    editId = req.params.id;
    console.log(editId);
    connection.query('SELECT * FROM tbl_product WHERE id = ?', [editId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('edit-product', { db_rows_array: db_rows });
    });
});

//Update Route Post
router.post('/edit/:id', function(req, res, next) {
    editId = req.params.id;
    var pName = req.body.txt1;
    var aName = req.body.txt2;
    var price = req.body.txt3;

    connection.query('UPDATE tbl_product set name = ?, details = ?, price = ? WHERE id = ?', [pName, aName, price, editId], function(err, db_rows) {
        if (err) throw err;
        res.redirect('/');
    });
});

//delete route
router.get('/delete/:id', function(req, res, next) {
    deleteId = req.params.id;
    connection.query('DELETE FROM tbl_product WHERE id = ?', [deleteId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.redirect('/');
    });
});


/* ------- Second table ------*/

//display route
router.get('/student', function(req, res, next) {
    connection.query('SELECT * FROM tbl_student', function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('index2', { db_rows_array: db_rows });
    });
});

//create route
router.get('/add-student', function(req, res, next) {
    res.render('add-student');
});

router.post('/student-process', function(req, res, next) {
    const myInfo = {
        name: req.body.name,
        erno: req.body.erno,
        email: req.body.email,
    }
    connection.query("INSERT into tbl_student set ?", myInfo, function(err, result) {
        if (err) throw err;
        res.redirect('/student');
    });
});

//read route
router.get('/student/read/:id', function(req, res, next) {
    editId = req.params.id;
    console.log(editId);
    connection.query('SELECT * FROM tbl_student WHERE id = ?', [editId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('read-student', { db_rows_array: db_rows });
    });
});

//update route get
router.get('/student/edit/:id', function(req, res, next) {
    editId = req.params.id;
    console.log(editId);
    connection.query('SELECT * FROM tbl_student WHERE id = ?', [editId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('edit-student', { db_rows_array: db_rows });
    });
});

//Update Route Post
router.post('/student/edit/:id', function(req, res, next) {
    editId = req.params.id;
    var name = req.body.name;
    var erno = req.body.erno;
    var email = req.body.email;

    connection.query('UPDATE tbl_student set name = ?, erno = ?, email = ? WHERE id = ?', [name, erno, email, editId], function(err, db_rows) {
        if (err) throw err;
        res.redirect('/student');
    });
});


//delete route
router.get('/student/delete/:id', function(req, res, next) {
    deleteId = req.params.id;
    connection.query('DELETE FROM tbl_student WHERE id = ?', [deleteId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.redirect('/student');
    });
});

module.exports = router;