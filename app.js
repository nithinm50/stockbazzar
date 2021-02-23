const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
var dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const User = require('./models/user');

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const error_controller = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    if (!user) {
      return next();
    }
    req.user = user;
    next();
  })
  .catch(err => {
    next(new Error(err));
  });
});

app.use(authRoutes);
app.use(adminRoutes);

app.get('/500', error_controller.get500);

app.use(error_controller.get404);

app.use((error, req, res, next) => {
    res.status(500).render('500', {
        title: 'Internal Server Error',
        isAuthenticated: req.session.isLoggedIn
    });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });