const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData)
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again." });
            return;
        }
        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again." });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true
            res.json({ user: userData, message: "You are now logged!" })
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.delete('/:id', async (req, res) => {
//     // console.log(req.params.id);
//     try {
//         const stuData = await Student.destroy({
//             where: {
//                 stu_id: req.params.id
//             }
//         }
//         )
//         res.redirect('/')
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = router;