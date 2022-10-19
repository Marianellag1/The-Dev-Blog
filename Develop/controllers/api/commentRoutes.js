const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req,res) => {
    try {
        const userComment = await Comment.create({

        });
        res.status(200).json(userComment);
     } catch (err) {
        res.status(400).json(err)
     }

});

module.exports = router;