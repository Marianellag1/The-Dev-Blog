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
            }
        ]
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
        posts, 
             loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const postData = await User.findByPk(req.session.user_id, {
//             attributes: {
//                 exclude: [
//                     "password"
//                 ]
//             },
//             include: [{ model: Post }],
//         });
//         const user = postData.get({ plain: true });
//         res.render('/dashboard', {
//             ...user,
//             loggedIn: true
//         });
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

//GET new post
// router.get('/new', withAuth, (req, res) => {
//     res.render('new-post', {
//         layout: 'dashboard'
//     })
// })

//GET
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
// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard