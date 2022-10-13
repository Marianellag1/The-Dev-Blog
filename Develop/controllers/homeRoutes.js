const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('all-posts', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.redirect('login')
    }
});


//get single post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk({
            where: {
                id: req.session.id
            },
            include: [

                User, {
                    model: Comment,
                    include: [User]
                },
            ]
        });
        const posts = postData.map((post) =>
            post.get({ plain: true }));
        res.render('single-post', { posts, loggedIn: req.session.loggedIn })
    } catch (err) {
        res.redirect('login')
    }
})

//login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
