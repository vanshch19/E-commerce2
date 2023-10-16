const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login/script');
const passport = require('passport'); 
const signUpController = require('../controllers/signup/script')

router.get('/login', loginController.getLogin);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/shop/profile1',
    failureRedirect: '/login' 
}));

router.get('/signup', signUpController.getSignup);

router.post('/signup', signUpController.postSignup);

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

module.exports = router;