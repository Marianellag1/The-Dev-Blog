const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

//get all post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        "username"
                    ],
                },
            ],
        });
        //serializing the data sot that template can be read.
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('login', {
        posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        // res.redirect('login')
        res.status(500).json(err);
    }
});


//get single post
// router.get('/post/:id', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk({
//             where: {
//                 id: req.session.id
//             },
//             include: [

//                 User, {
//                     model: Comment,
//                     include: [User]
//                 },
//             ]
//         });
//         const posts = postData.map((post) =>
//             post.get({ plain: true }));
//         res.render('single-post', {
//             ...posts,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         // res.redirect('login')
//         res.status(500).json(err);
//     }
// })

//login route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');//redirect to dashboard
        return;
    }
    res.render('signup');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');

});

module.exports = router;
