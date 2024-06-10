const { Comments } = require('../models');

const commentsData = [
    {
        comments_content: 'Testing of the comments feature',
        post_id: 1,
        user_id: 1,
    },
    {
        comments_content: 'This is true',
        post_id: 2,
        user_id: 3,
    },
    {
        comments_content: 'Keep posting',
        post_id: 2,
        user_id: 4,
    },
    {
        comments_content: 'Ok will do',
        post_id: 2,
        user_id: 2,
    },
    {
        comments_content: 'Concerning',
        post_id: 3,
        user_id: 3,
    },
    {
        comments_content: 'True but please keep it lighthearted',
        post_id: 3,
        user_id: 4,
    },
  ];

  const seedComments = () => Comments.bulkCreate(commentsData);

  module.exports = seedComments;