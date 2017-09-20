const mongoose = require('../libs/mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


exports.register = (req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, team: req.body.team})
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
    req.checkBody('confirmPassword', 'Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors){
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { title: 'Register', body: req.body, flashes: req.flash()})
        return
    }
    next()
};

exports.registerPost = async (req, res, next) => {
    const user = new User({name: req.body.name, email: req.body.email, team: req.body.team});
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next();
}

exports.profile = async(req, res) => {
    const user = await User.findOne( req.user._id );
    res.render('profile', { title: 'Profile', user})
}