const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// This loads the homepage.hadlebars with selected data
router.get('/', async (req, res) => {
  try {
    const userData = await Post.findAll({
      attributes: [
        'id',
        'title',
        "post_text",
        'created_at'      
      ],
      order: [['created_at', 'ASC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
