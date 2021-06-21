'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    tite: {
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
    // associations can be defined here
  };
  return Album;
};
