const { Post } = require('../models');

const postData = [
    {
    post_title: 'Test',
    post_text: 'First test post',
    date_time: "2024-06-07T09:15:06.000Z",
    user_id: 1,
    },
    {
    post_title: 'Dog Fact 1',
    post_text: 'Dogs are cool',
    date_time: "2024-06-08T09:12:55.000Z",
    user_id: 2,
    },
    {
    post_title: 'Dog Fact 2',
    post_text: 'Dogs should not eat spidders',
    date_time: "2024-06-09T09:08:16.000Z",
    user_id: 2,
    },
    {
    post_title: 'Needs more dogs',
    post_text: 'Dog facts needs more dogs stat',
    date_time: "2024-06-09T09:18:36.000Z",
    user_id: 3,
    },
  ];

  const seedPost = () => Post.bulkCreate(postData);

  module.exports = seedPost;