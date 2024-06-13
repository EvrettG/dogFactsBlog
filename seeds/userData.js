const { User } = require('../models');

const userData = [
    {
        username: "admin",
        // email: "Admin@hotmail.com",
        password: "password12345"
    },
    {
        username: "Sarra",
        // email: "sarra@yahoo.com",
        password: "password12345"
    },
    {
        username: "Eric",
        // email: "eric@gmail.com",
        password: "password12345"
    },
    {
        username: "Jordan",
        // email: "jordan99@msn.com",
        password: "password12345"
    }
  ];

  const seedUser = () => User.bulkCreate(userData);

  module.exports = seedUser;