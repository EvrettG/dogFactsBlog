const router = require('express').Router();

// gets routes for user, post and comments
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentsRoutes = require('./commentsRoutes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;