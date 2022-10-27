const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.get('/', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             where:
//             {
//                 "id": req.session.id
//             },
//             include: [
//                 { 
//                     model: User,
//                 attributes: [ 'username']
//             },
//         ]
//         });
    
//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('all-posts-admin', {
//             layout: 'dashboard',
//         posts, 
//              loggedIn: req.session.loggedIn });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

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
        res.render('single-post', {
            ...posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        // res.redirect('login')
        res.status(500).json(err);
    }
})

//login route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');//redirect to dashboard
    } else {

        res.render('signup');
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }

});

module.exports = router;
