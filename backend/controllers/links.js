const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res){
    res.render('link_view');
});

module.exports = router;