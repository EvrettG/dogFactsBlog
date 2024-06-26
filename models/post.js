// Here is where we set up the post model, for when we are ready to connect to a database in future activities.

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}
// set's table to include id, post title, post content and refeence it to a user via user_id foriegn key
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false
            },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
            },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
            },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
      }
);

module.exports = Post;
