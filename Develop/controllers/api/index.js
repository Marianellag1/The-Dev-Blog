const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
//post-blog routes
router.use('/post', postRoutes);
//comment
router.use('/comment', commentRoutes);

module.exports = router;
