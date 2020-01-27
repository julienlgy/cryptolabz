'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rss = sequelize.define('Rss', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  Rss.associate = function(models) {
    // associations can be defined here
  };
  return Rss;
};
