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
          comment: "I can be your date next time :)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          photoId: 3,
          comment: "This photo is amazing.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          photoId: 4,
          comment: "Can confirm, I lost 2 inches off my hips from running here for 3 days.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          photoId: 5,
          comment: "Definitely only come here during the Summer. Winter if you want to turn into an icicle.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          photoId: 6,
          comment: "Nice!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          photoId: 7,
          comment: "That guy has the same hair as me!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          photoId: 8,
          comment: "A cup of tea hits different with that one.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          photoId: 9,
          comment: "The xiao long bao at the bakery is sooo good.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          photoId: 10,
          comment: "I'd love to see the interior of those houses.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          photoId: 11,
          comment: "Didn't know that was there either!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          photoId: 12,
          comment: "This photo is amazing.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          photoId: 13,
          comment: "What a nice view!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          photoId: 14,
          comment: "Nice shot!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          photoId: 15,
          comment: "Looks crowded. Nice picture tho!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          photoId: 16,
          comment: "I like the architecture. Definitely would love to tour SF someday :)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          photoId: 17,
          comment: "Love the colors!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          photoId: 18,
          comment: "Nice photo, as always!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          photoId: 19,
          comment: "Thank you for supporting the local businesses! Nice photo btw!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          photoId: 20,
          comment: "Nice shot of the Castro! I will also be there this weekend!",
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
