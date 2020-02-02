'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cryto = sequelize.define('Crypto', {
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    slug: DataTypes.STRING,
    currentPrice: DataTypes.FLOAT,
    openingPrice: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    high: DataTypes.FLOAT,
    imgUrl: DataTypes.STRING
  }, {});
  Cryto.associate = function(models) {
    // associations can be defined here
  };
  return Cryto;
};