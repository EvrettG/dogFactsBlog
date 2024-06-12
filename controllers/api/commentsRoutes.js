const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comments } = require('../../models');


// Note: Get all comment performed in post singular get
router.get('/', async (req, res) => {
    try {
        const commentsdata = await Comments.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json(commentsdata);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new Comment
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new post using the Post model
        const commentdata = await Comments.create({
            comments_text: req.body.comments_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        return res.status(200).json(commentdata);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
// TODO later Time issue
// Update a comments's text by ID
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         const comments = await Comments.findByPk(req.params.id);
        
//         if (!comments) {
//             return res.status(404).json({ message: 'No comments found with this id' });
//         }

//         const updatedcomment = await comments.update({
//             comments_text: req.body.comments_text
//         });

//         res.status(200).json(updatedcomment);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

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