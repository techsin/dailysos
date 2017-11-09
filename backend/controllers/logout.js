const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');


router.get('/', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;