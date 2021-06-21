'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    photoId: {
      allowNull:false,
      type: DataTypes.INTEGER
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
