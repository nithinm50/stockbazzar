const express = require('express');
const adminController = require('../controllers/admin');
const isauth = require('../middleware/is-auth');
const router = express.Router();

router.get('/',isauth, adminController.getHome);

router.get('/stock/:symbol',isauth, adminController.getStock);

// router.get('/dashboard', adminController.getDashboard);

module.exports = router;