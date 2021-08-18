const Product = require('../models/product');
const Order = require('../models/order');
const Contact = require('../models/contact');
const stripe = require('stripe')(process.env.API_KEY);

//Home page
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//read Products ==> GET
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/products', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        }).catch(err => console.log(err));
};

//Read product deatils ==> get
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
                pageTitle: product.title,
                path: "/products"
            });
        }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: products
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCheckout = (req, res, next) => {
    let products;
    let total = 0;
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            products = user.cart.items;
            total = 0;
            products.forEach(p => {
                total += p.quantity * p.productId.price;
            })

            return stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map(p => {
                    return {
                        name: p.productId.title,
                        description: p.productId.description,
                        amount: p.productId.price,
                        currency: 'inr',
                        quantity: p.quantity
                    };
                }),
                success_url: req.protocol + '://' + req.get('host') + '/checkout/success',
                cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
            });
        })
        .then(session => {
            res.render('shop/checkout', {
                pageTitle: 'Checkout',
                path: '/checkout',
                products: products,
                totalSum: total,
                sessionId: session.id
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getCheckoutSuccess = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: {...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.session.user._id })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};

//testimonials
exports.getTestimonials = (req, res, next) => {
    res.render('shop/testimonials', {
        pageTitle: 'Testimonials',
        path: '/testimonials'
    });
};

//about us
exports.getAbout = (req, res, next) => {
    res.render('shop/about', {
        pageTitle: 'About us',
        path: '/about'
    });
};

//terms
exports.getTerms = (req, res, next) => {
    res.render('shop/terms', {
        pageTitle: 'Terms',
        path: '/terms'
    });
};


//contact us ==> GET
exports.getContact = (req, res, next) => {
    res.render('shop/contact', {
        pageTitle: 'Contact us',
        path: '/contact'
    });
};

//contact us ==> POST
exports.postContact = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const info = new Contact({
        name: name,
        email: email,
        message: message,
    });
    info
        .save()
        .then(() => {
            res.redirect('/contact');
            console.log('Message Sent Successfully!');
        }).catch(err => {
            console.log(err);
        });
};