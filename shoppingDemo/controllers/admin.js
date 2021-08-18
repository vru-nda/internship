const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAdminIndex = (req, res, next) => {
    res.render('admin/index', {
        pageTitle: 'Dashboard',
        path: '/admin'
    });
};

exports.getAdminProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/dashboard', {
                pageTitle: 'Product List',
                path: '/admin/products',
                prods: products
            });
        }).catch(err => {
            console.log(err);
        });
};

//create/add prdoduct => GET
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

//create/add prdoduct => POST
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const price = req.body.price;
    const description = req.body.description;
    const imgUrl = req.body.imgUrl;

    const product = new Product({
        title: title,
        author: author,
        price: price,
        description: description,
        imgUrl: imgUrl,
        userId: req.user
    });

    product
        .save()
        .then(result => {
            console.log('Product Created!');
            res.redirect('/admin/products');
        }).catch(err => {
            console.log(err);
        });

};

//edit/add prdoduct => POST
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        }).catch(err => console.log(err));
};

//edit-prdoduct => POST
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedauthor = req.body.author;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedUrl = req.body.imgUrl;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.author = updatedauthor;
            product.imgUrl = updatedUrl;
            product.price = updatedPrice;
            product.description = updatedDesc;
            return product.save();
        })
        .then(result => {
            console.log('Updated product!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

//delete-product => GET
exports.getDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/delete-product', {
                pageTitle: 'Delete Product',
                path: '/admin/delete-product',
                product: product
            });
        }).catch(err => console.log(err));
};

//delete-prdoduct => POST
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
        .then(() => {
            console.log("Destroyed Product!");
            res.redirect('/admin/products');

        })
        .catch(err => {
            console.log(err);
        });
};