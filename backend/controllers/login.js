const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res) {
    passport.authenticate('local', {
        successRedirect: '/timeline',
        failureRedirect: '/login',
    })(req, res);
});

router.get('/google', function (req, res) {
  // handle with passport
  res.send('Logging in with Google');
});

module.exports = router;
