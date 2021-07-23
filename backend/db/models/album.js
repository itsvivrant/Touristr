'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: 'userId'})

    const columnMapping = {
      through: 'AlbumPhoto',
      otherKey: 'photoId',
      foreignKey: 'albumId'
    }
    Album.belongsToMany(models.Photo, columnMapping)

  };
  return Album;
};
