const { User } = require('../models');

const userData = [
    {
        name: "admin",
        email: "Admin@hotmail.com",
        password: "password12345"
    },
    {
        name: "Sarra",
        email: "sarra@yahoo.com",
        password: "password12345"
    },
    {
        name: "Eric",
        email: "eric@gmail.com",
        password: "password12345"
    },
    {
        name: "Jordan",
        email: "jordan99@msn.com",
        password: "password12345"
    }
  ];

  const seedUser = () => User.bulkCreate(userData);

  module.exports = seedUser;