'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
    {
     userId: 1,
     locationId: null,
     imgURL: 'https://unsplash.com./photos/AFlG5jpMvYg',
     title: 'Title: Demo Photo 1',
     caption: 'Demo photo caption',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     userId: 1,
     locationId: null,
     imgURL: 'https://unsplash.com./photos/Ji_G7Bu1MoM',
     title: 'Title: Demo Photo 2',
     caption: 'Demo photo caption 2',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      userId: 1,
      locationId: null,
      imgURL: 'https://unsplash.com./photos/a3ZPAE2kaGU',
      title: 'Title: Demo Photo 3',
      caption: 'Demo photo caption 3',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      locationId: null,
      imgURL: 'https://unsplash.com./photos/3AAyCMU5Ufg',
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
