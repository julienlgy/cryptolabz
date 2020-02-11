'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crypto = sequelize.define('Crypto', {
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    slug: DataTypes.STRING,
    currentPrice: DataTypes.FLOAT,
    openingPrice: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    high: DataTypes.FLOAT,
    imgUrl: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    marketCap: DataTypes.FLOAT,
    description: DataTypes.TEXT
  }, {});
  Crypto.associate = function(models) {
    // associations can be defined here
  };
  return Crypto;
};