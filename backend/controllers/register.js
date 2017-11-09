const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Users = models.Users;

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    if (req.body.password !== req.body.retype_password) {
        var err = { msg: 'Password didn\'t Match' };
        res.render('register', { error: [err] });
    } else if (!req.body.over18) {
        var err = { msg: 'Must be over 18 and Agree to TOS' };
        res.render('register', { error: [err] });
    } else {
        Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
            about: req.body.about
        }).then((user) => {
            req.login(user, () =>
                res.redirect('/timeline')
            );
        }).catch((err) => {
            console.log(err);
            res.render('register');
        });
    }

});

module.exports = router;
