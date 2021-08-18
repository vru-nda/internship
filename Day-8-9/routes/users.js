const { query } = require('express');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeDemo'
});


/* ----- Third table --------*/

//display route
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM tbl_users', function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('index3', { db_rows_array: db_rows });
    });
});

router.get('/add-user', function(req, res, next) {
    res.render('add-user');
});

//create route
router.post('/user-process', function(req, res, next) {

    const detail = {
        name: req.body.name,
        password: req.body.psw,
        address: req.body.add,
        sex: req.body.sex
    }

    connection.query("INSERT into tbl_users set ?", detail, function(err, result) {
        if (err) throw err;
        res.redirect('/users');
    });
});

//read route
router.get('/user/read/:id', function(req, res, next) {
    editId = req.params.id;
    console.log(editId);
    connection.query('SELECT * FROM tbl_users WHERE id = ?', [editId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('read-user', { db_rows_array: db_rows });
    });
});

//update route get
router.get('/user/edit/:id', function(req, res, next) {
    editId = req.params.id;
    console.log(editId);
    connection.query('SELECT * FROM tbl_users WHERE id = ?', [editId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.render('edit-user', { db_rows_array: db_rows });
    });
});

//Update Route Post
router.post('/user/edit/:id', function(req, res, next) {
    editId = req.params.id;
    var name = req.body.name;
    var password = req.body.psw;
    var address = req.body.add;
    var sex = req.body.sex;

    connection.query('UPDATE tbl_users set name = ?, password = ?, address = ?, sex = ? WHERE id = ?', [name, password, address, sex, editId], function(err, db_rows) {
        if (err) throw err;
        res.redirect('/users');
    });
});

//delete route
router.get('/user/delete/:id', function(req, res, next) {
    deleteId = req.params.id;
    connection.query('DELETE FROM tbl_users WHERE id = ?', [deleteId], function(err, db_rows) {
        if (err) throw err;
        console.log(db_rows);
        res.redirect('/users');
    });
});

module.exports = router;