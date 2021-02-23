exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
      title: 'Page Not Found',
      nav: false,
      isAuthenticated: req.session.isLoggedIn
    });
};
  
exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
      title: 'Error!',
      nav: false,
      isAuthenticated: req.session.isLoggedIn
    });
};
  