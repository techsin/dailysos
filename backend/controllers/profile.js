const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use(auth.redirectIfNotLoggedIn('/'));

router.get('/:name', function(req, res){
    res.render('public_profile');
});

module.exports = router;