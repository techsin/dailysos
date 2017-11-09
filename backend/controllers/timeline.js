const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use(auth.redirectIfNotLoggedIn('/'));

router.get('/', function(req, res){
    res.render('timeline');
});

module.exports = router;