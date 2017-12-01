const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
router.use(auth.redirectIfNotLoggedIn('/'));
const models = require('../db/models');
const Posts = models.Posts;
const Links = models.Links;
const getUrls = require('get-urls');


router.get('/:id', function (req, res) {
    res.render('link_view');
});

router.post('/', async function (req, res) {
    let urls = getUrls(req.body.links);
    let allLinks = [];

    for (let url of urls) {
        let link = await Links.findOne({ where: { url } });
        if (link === null) {
            link = await Links.create({ url });
        }
        allLinks.push(link);
    }
    
    for (let l of allLinks) {
        let post = await Posts.create({});
        await post.setLink(l);
        await post.setUser(req.user);
    }
    res.redirect('/timeline');
});

module.exports = router;