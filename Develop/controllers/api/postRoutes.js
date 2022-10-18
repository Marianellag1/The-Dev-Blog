const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
        const userPost = await Post.create({
            
        });
    res.status(200).json(userPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;