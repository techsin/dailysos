const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use(auth.redirectIfNotLoggedIn('/'));

router.get('/', async function(req, res){
    var tmp = await req.user.getPosts();
    var posts = [];
    for (let x of tmp) {
        posts.push({
            link: await x.getLink(), 
            upvotes: x.getUpvotes()
        });
    }
    console.log(posts);
    res.locals.posts = posts;
    res.render('timeline');
});

module.exports = router;