const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comments, User } = require('../../models');

// Get all Posts
router.get('/', async (req, res) => {
    try {
        const postdata = await Post.findAll({
            order: [['created_at', 'DESC']],
            include: [
                {
                  model: User,
                  attributes: ['username']
                },
                {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['username']
                  }
                }
              ]
        });
        if (postdata){
        res.status(200).json(postdata)
    } else {
        res.status(404).json({ message: 'No post found' });
    }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postdata = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'post_text', 'created_at'],
            include: [
              {
                model: User,
                attributes: ['username']
              },
              {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              }
            ]
        });

        if (!postdata) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        } else{
            res.status(200).json(postdata)
        }

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new Post
router.post('/', withAuth, async (req, res) => {
    try {
        // Checks usser is logged in
        if (!req.session.user_id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Extracting the necessary data from the request body
        const { title, post_text } = req.body;
        
        // Create a new post using the Post model
        const postdata = await Post.create({
            post_title: title,
            post_text: post_text,
            user_id: req.session.user_id
        });

        // Respond with the created post data
        return res.status(200).json(postdata);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update a Post's text by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        const updatedPost = await post.update({
            post_text: req.body.post_text
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a Post by ID
router.delete('/:id',withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'No post found with this id' });
        }
        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;