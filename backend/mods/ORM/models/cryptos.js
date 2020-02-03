'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cryptos = sequelize.define('Cryptos', {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    slug: {
        type: DataTypes.STRING,
allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    currentPrice: {
        type: DataTypes.FLOAT
    },
    openingPrice: {
        type: DataTypes.FLOAT //openingPrice, lower day, upper day
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    lowerDay: {
        type: DataTypes.FLOAT
    },
    upperDay: {
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
  Cryptos.associate = function(models) {
    // associations can be defined here
  };
  return Cryptos;
};