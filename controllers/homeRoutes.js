const router = require('express').Router();
const { User, Post, Comments } = require('../models');

// This loads the homepage.hadlebars with selected data
router.get('/', async (req, res) => {
  try {
    const userData = await Post.findAll({
      attributes: [
        'id',
        'post_title',
        "post_text",
        'created_at'      
      ],
      include: [
        {
          model: Comments,
          attributes: ['id', 'comments_content', 'post_id', 'user_id', 'created_at'],
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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/post/:id', async (req, res) =>{
try {
  const postData = await Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_title',
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
  // console.log(postData)
  const post = postData.get({ plain: true });
  console.log(post)
  res.render('singlePost', {
    post, 
    loggedIn: req.session.loggedIn
  });
} catch (error) {
  res.status(500).json(err);
}
})



module.exports = router;
