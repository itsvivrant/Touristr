'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    latitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    longitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
    }
  }, {});
  Locations.associate = function(models) {
    // associations can be defined here
  };
  return Locations;
};
