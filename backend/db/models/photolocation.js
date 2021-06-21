'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoLocation = sequelize.define('PhotoLocation', {
    photoId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {});
  PhotoLocation.associate = function(models) {
    // associations can be defined here
  };
  return PhotoLocation;
};
