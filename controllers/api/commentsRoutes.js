const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comments } = require('../../models');


// Note: Get all comment performed in post singular get, Revist if necessary
// Get all comments and render homepage
router.get('/', async (req, res) => {
    try {
        const commentsdata = await Comments.findAll({
            order: [['created_at', 'DESC']]
        });
        const comments = commentsdata.map(comments => comments.get({ plain: true }));

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new Comment
router.post('/', withAuth, async (req, res) => {
    try {
        // Checks usser is logged in
        if (!req.session.user_id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Extracting the necessary data from the request body
        const { post_id, comments_text, created_at } = req.body;
        
        // Create a new post using the Post model
        const commentdata = await Comments.create({
            post_id: post_id,
            comments_text: comments_text,
            user_id: req.session.user_id
        });

        // Respond with the created post data
        return res.status(200).json(commentdata);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update a comments's text by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const comments = await Comments.findByPk(req.params.id);
        
        if (!comments) {
            return res.status(404).json({ message: 'No comments found with this id' });
        }

        const updatedcomment = await comments.update({
            comments_text: req.body.comments_text
        });

        res.status(200).json(updatedcomment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a comment by ID
router.delete('/:id',withAuth, async (req, res) => {
    try {
        const comment = await Comments.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'No comment found with this id' });
        }
        await comment.destroy();
        res.status(200).json({ message: 'comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;