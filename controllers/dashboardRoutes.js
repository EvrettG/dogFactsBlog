const router = require('express').Router();
const { User, Post, Comments } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for 1 user in the dashboard
router.get('/',withAuth, async  (req, res) => {
  try {
      const postdata = await Post.findAll({
          where: {
              user_id: req.session.user_id
            },
            attributes: ['id', 'post_title', 'post_text', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
              {
                model: User,
                attributes: ['username']
              },
              {
                model: Comments,
                attributes: ['id', 'comments_content', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              }
            ]
          });
      const posts = postdata.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
  } catch (error) {
      console.log(err);
    res.status(500).json(err);
  }
});

//get a single post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: Comments,
          attributes: [
            'id',
            'comments_content',
            'post_id',
            'user_id',
            'created_at'
          ],
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
    if (!postData){
      res.status(404).json({ message: 'No Post found with this id' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('editPost', {
      post, 
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

// Takes user to the newPost.handlebars page /loads the newPost file
router.get('/new', (req, res) => {
  res.render('newPost');
});
  
  
  module.exports = router;