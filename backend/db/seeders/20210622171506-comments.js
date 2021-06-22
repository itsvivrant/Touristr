"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 2,
          photoId: 1,
          comment: "Wow, I really want to visit San Franscico someday! Thanks for sharing :)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          photoId: 2,
          comment: "This photo is amazing. My comment worked!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          photoId: 1,
          comment: "This photo is amazing. My comment worked!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
