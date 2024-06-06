// Here is where we set up the Comments model, for when we are ready to connect to a database in future activities.

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends model {}
// set's table to include id, Comments title, Comments content and refeence it to a user via user_id foriegn key
Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            },
        comments_content: {
            type: DataTypes.STRING,
            allowNull: false,
            },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
            },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
            },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
      }
);

module.exports = Comments;