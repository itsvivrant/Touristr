'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Albums', [
        {
        userId: 1,
        title: 'San Francsico',
        description: 'My favorite places in San Francisco',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: 'My Album Title',
        description: 'This is my Caption',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'My Album Title',
        description: 'This is my Caption',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
