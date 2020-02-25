'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crypto = sequelize.define('Crypto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
    description: DataTypes.TEXT,
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});
  Crypto.associate = function(models) {
    Crypto.belongsToMany(models.User, {
      through: 'Favorites',
      as: 'users',
      foreignKey: 'cryptoId',
      otherKey: 'userId'
    });
  };
  return Crypto;
};