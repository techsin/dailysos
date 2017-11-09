const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use(auth.redirectIfNotLoggedIn('/'));

router.get('/:id', function(req, res){
    res.render('link_view');
});

module.exports = router;