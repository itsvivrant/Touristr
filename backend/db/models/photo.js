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

    Photo.belongsTo(models.User, {foreignKey: 'userId'})


    const columnMapping = {
      through: 'AlbumPhoto',
      otherKey: 'albumId',
      foriegnKey: 'photoId'
    }
    Photo.belongsToMany(models.Album, columnMapping)
    Photo.hasMany(models.AlbumPhoto, {foreignKey: 'photoId'})
    Photo.hasMany(models.Comment, {foreignKey: 'photoId'})
    Photo.hasMany(models.Favorite, {foreignKey: 'photoId'})
    Photo.belongsTo(models.Location, {foreignKey: 'locationId'})
  };
  return Photo;
};
