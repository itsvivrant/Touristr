'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumPhoto = sequelize.define('AlbumPhoto', {
    photoId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    albumId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  AlbumPhoto.associate = function(models) {
    // associations can be defined here
  };
  return AlbumPhoto;
};
