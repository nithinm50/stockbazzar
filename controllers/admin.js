const yahooFinance = require('yahoo-finance');
const Stock = require('../models/stock');


exports.getHome = (req, res, next)=>{
    Stock.find()
    .then(stocks => {
        res.render('admin/dashboard', {title:'Dashboard', nav:true, stock:stocks});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getStock = (req, res, next) =>{
    const symbol = req.query.p;
    yahooFinance.quote({
        symbol: symbol,
        modules: ['price', 'summaryDetail', 'financialData']
    }, function(err, quote) {
        if(!err){
          return quote;
        }
        return res.redirect('/');
      })
    .then(result => {
        if (!result) {
            return res.redirect('/');
        }
        res.render('admin/Stocks', {title:`${result.price.longName} Stock Details`, nav:true, item: result});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}