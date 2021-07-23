'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist1@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'occasional_greens',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist2@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'adventurously-relieved',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist3@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'dusty_brewer',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist4@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'dailycheesecake',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist5@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'new_gallery',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist6@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'amateurphotographer',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist7@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'fondPottery',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist8@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'perpetual_wanderlust',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist9@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: 'flimsytyrant',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: "tourist10@user.io",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: '/UptightScenery',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'occasional_greens', 'adventurously-relieved', 'dusty_brewer', 'NoteworthyHearts', 'belligerentcharade'] }
    }, {});
  }
};
