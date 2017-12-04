const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
router.use(auth.redirectIfNotLoggedIn('/'));
const models = require('../db/models');
const Posts = models.Posts;
const Links = models.Links;
const getUrls = require('get-urls');
const axios = require('axios');

router.get('/:id', function (req, res) {
    res.render('link_view');
});

router.post('/', async function (req, res) {
    let urls = getUrls(req.body.links);
    let allLinks = [];

    for (let url of urls) {
        let link = await Links.findOne({ where: { url } });
        if (link === null) {
            let title = await getTitle(url);
            link = await Links.create({ url, title});
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

async function getTitle(url) {
    let res;
    try {
        res = await axios.get(url)
    } catch (error) {
        console.log('error', error);
        return null;
    }
    let title = res.data.match(/<title>(.*?)<\/title>/)[1];
    return title;
}
