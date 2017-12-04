const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const sequelize = require('../db/models').sequelize;
router.use(auth.redirectIfNotLoggedIn('/'));

router.get('/', async function(req, res){
    var tmp = await req.user.getPosts({order: [['createdAt', 'DESC']]});

    var posts = {};
    for (let x of tmp) {
        let date = new Date(x.createdAt);
        let day = date.toLocaleString('en-us', { month: "long" }) + " " + date.getDate();
        posts[day] = posts[day] || [];
        posts[day].push({
            link: await x.getLink(), 
            upvotes: x.getUpvotes()
        });
    }
    console.log(posts);

    res.locals.posts_data = posts;
    res.render('timeline');
});

module.exports = router;