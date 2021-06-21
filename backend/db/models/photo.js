'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    caption: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imgURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};
