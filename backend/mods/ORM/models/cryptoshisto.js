'use strict';
module.exports = (sequelize, DataTypes) => {
  const CryptosHisto = sequelize.define('CryptosHisto', {
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
  }, {});
  CryptosHisto.associate = function(models) {
    // associations can be defined here
  };
  return CryptosHisto;
};