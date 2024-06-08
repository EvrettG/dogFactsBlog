const User = require('./user');
const Comments = require('./comments');
const Post = require('./post');

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
foreignKey: 'post_id'
});

Post.hasMany(Comment, {
foreignKey: 'post_id',
onDelete: 'CASCADE'
});

module.exports = {User, Comments, Post}