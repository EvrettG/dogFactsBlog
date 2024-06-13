const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');


// Note: Get all comment performed in post singular get
router.get('/', async (req, res) => {
    try {
        const commentsdata = await Comments.findAll({
        });
        res.json(commentsdata);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new Comment
router.post('/', withAuth, async (req, res) => {
    if (req.session){
        try {
            const commentsdata = await Comments.create({
                comments_content: req.body.comments_content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            });
            return res.status(200).json(commentsdata);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});

// Delete a comment by ID
router.delete('/:id',withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comments.fdestroy({
            where: {
              id: req.params.id
            }
          })
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;