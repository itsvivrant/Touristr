'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
    {
     userId: 1,
     locationId: null,
     imgURL: 'https://images.unsplash.com/photo-1547190994-0dfe4ab1bdae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
     title: 'Title: Demo Photo 1',
     caption: 'Demo photo caption',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     userId: 1,
     locationId: null,
     imgURL: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
     title: 'Title: Demo Photo 2',
     caption: 'Demo photo caption 2',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      userId: 1,
      locationId: null,
      imgURL: 'https://images.unsplash.com/photo-1523985231622-ce12bb51849a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
      title: 'Title: Demo Photo 3',
      caption: 'Demo photo caption 3',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      locationId: null,
      imgURL: 'https://images.unsplash.com/photo-1549909780-f553e97e5516?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80',
      title: 'Title: Demo Photo 4',
      caption: 'Demo photo caption 4',
      createdAt: new Date(),
      updatedAt: new Date(),
     },

  ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
