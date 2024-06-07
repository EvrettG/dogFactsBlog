// Here is where we set up the User model, for when we are ready to connect to a database in future activities.

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}
// set's table to include id, Username, User password and user email
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                },
            },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
            },
    },
    {
        // Used to encrpt password before storage into database
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
      }
);

module.exports = User;