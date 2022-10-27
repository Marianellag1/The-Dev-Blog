const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where:
            {
                "id": req.session.id
            },
            include: [
                { 
                    model: User,
                attributes: [ 'username']
            },
        ]
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
        posts, 
             loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: [
                    "password"
                ]
            },
            include: [{ model: Post }],
        });
        const user = postData.get({ plain: true });
        res.render('/dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    })
})

// GET
// router.get('/edit/:id', async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id);
//         const posts = postData.map((post) =>
//             post.get({ plain: true })
//         );
//         res.render('edit-post', { posts, loggedIn: req.sessioin.loggedIn });

//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

module.exports = router;

