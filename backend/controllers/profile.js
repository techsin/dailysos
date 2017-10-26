const express = require('express');
const router = express.Router();

router.get('/:name', function(req, res){
    res.render('public_profile');
});

module.exports = router;