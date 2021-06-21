'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    photoId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};
