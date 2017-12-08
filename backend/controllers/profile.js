const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use(auth.redirectIfNotLoggedIn('/'));

router.get('/adam', function(req, res){
    res.render('public_profile_1');
});

router.get('/jennifer', function(req, res){
    res.render('public_profile_2');
});

router.get('/Alexis', function(req, res){
    res.render('public_profile_3');
});



module.exports = router;
