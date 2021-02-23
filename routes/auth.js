const express = require('express');
const { check, body } = require('express-validator/check');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/register', authController.getRegister)

router.post('/register', 
    [   check('email').withMessage('Enter a vaild Email ID').normalizeEmail(),
        body('password').isLength({min:5}).withMessage('Password should contain atleast 5 characters').isAlphanumeric().withMessage('Password must contain both nubers and alphabets').trim(),
        body('repassword').trim().custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('password have to match!');
        }
        return true;
        })
    ],
    authController.postRegister
);


router.get('/login', authController.getLogin)

router.post(
    '/login',
    [
      body('email')
        .isEmail()
        .withMessage('Enter a valid Email ID')
        .normalizeEmail(),
      body('password', 'Password can not be empty!')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ],
    authController.postLogin
  );

router.post('/logout', authController.postLogout);

module.exports = router;