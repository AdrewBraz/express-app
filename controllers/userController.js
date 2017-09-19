const mongoose = require('../libs/mongoose');

exports.register = (req, res) => {
    res.render('register', { title: 'Profile'})
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name').notEmpty();
    req.checkBody('email', 'Email address in not valid').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!').notEmpty();
    req.checkBody('confirmPassword', 'Password cannot be blank!').notEmpty();
    req.checkBody('password', 'Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors){
        req.flash('error', errors.map(err => err.msg));
        res.render('index', { title: 'NbaGeek', body: req.body, flashes: req.flash()})
    }
    next()
};

exports.registerPost = (req, res) => {
    res.redirect('/profile')
}