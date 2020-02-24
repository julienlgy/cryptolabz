
'use strict';
module.exports = (sequelize, DataTypes) => {
  const CryptoHisto = sequelize.define('CryptoHisto', {
    symbol: DataTypes.STRING,
    price: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {});
  CryptoHisto.associate = function(models) {
    // associations can be defined here
  };
  return CryptoHisto;
};