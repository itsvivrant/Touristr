'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    tite: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Users'}
    },
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};
