const router = require('express').Router();
const { User, Post, Comments } = require('../../models');

// Get All users
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(dbUserData)
  } catch (error) {
    res.status(500).json(err);
  }
});

// Get a single user by id number
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'post_title', 'post_text', 'created_at']
        },
        {
          model: Comments,
          attributes: ['id', 'comments_content', 'created_at']
        }
      ]
    });
    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    } else {
      res.status(200).json(dbUserData)
    }
  
  } catch (error) {
    res.status(500).json(err);
  }
})

// CREATE new user
router.post('/', async (req, res) => {
    if(!req.body.username){
      return res.status(400).json({ message: 'User name is required' });
    }
    if (!req.body.password || !req.body.password.length >= 6){
      return res.status(400).json({ message: 'Password is not valid' });
    }
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//login route
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    // Verify if the user exists
    if (!dbUserData) {
      return res.status(400).json({ message: 'Username not found' });
    }

    // Log passwords for debugging after ensuring dbUserData exists
    console.log('Input password:', req.body.password);
    console.log('Stored hashed password:', dbUserData.password);

    // Verify password
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    // Save session and send response
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.error(error); // Ensure the error is logged for debugging
    res.status(500).json(error); // Use the same variable name
  }
});

  //logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
});

//update a user by id number
router.put('/:id', async (req, res) => {
  try {
    const dbUserData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }
    res.json(dbUserData);
  } catch (error) {
    res.status(500).json(err);
  }
});

//Delete a user by id number
router.delete('/:id', async(req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }
    res.json(dbUserData);
  } catch (error) {
    res.status(500).json(err);
  }
  
})



module.exports = router;