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

router.get('/google', passport.authenticate('google', { scope: ['profile'] })
);

// Callback route for Google OAuth
router.get('/google/redirect', passport.authenticate('google'), function (req, res) {
  res.send('Callback route for Google OAuth');
});

module.exports = router;
