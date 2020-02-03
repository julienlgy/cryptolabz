'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleSource = sequelize.define('ArticleSource', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  ArticleSource.associate = function(models) {
    // associations can be defined here
  };
  return ArticleSource;
};