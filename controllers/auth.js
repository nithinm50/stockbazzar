const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

exports.getLogin = (req, res, next)=>{
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        title:'Login',
        nav:false,
        errorMessage: message,
        oldInput: {
        email: '',
        password: ''
        },
        validationErrors: []
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
        title: 'Login',
        nav:false,
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: errors.array()
      });
    }
  
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            return res.status(422).render('auth/login', {
            title: 'Login',
            nav:false,
            errorMessage: 'Invalid email or password.',
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: []
            });
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                res.redirect('/');
                });
            }
            return res.status(422).render('auth/login', {
                title: 'Login',
                nav:false,
                errorMessage: 'Invalid email or password.',
                oldInput: {
                    email: email,
                    password: password
                },
                validationErrors: []
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    })
    .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
    });
};

exports.getRegister = (req, res, next)=>{

    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/register', {
        title:'Register', nav:false,
        errorMessage: message,
        oldInput: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
        },
        validationErrors: []
    })
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty){
        res.render('auth/register', {
            title:'Register', nav:false,
            errorMessage: message,
            oldInput: {
            name: name,
            email: email,
            password: password,
            confirmPassword: req.body.repassword
            },
            validationErrors: errors.array()
        });
    }
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] }
        });
        return user.save();
    })
    .then(result =>{
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/login');
    });
};