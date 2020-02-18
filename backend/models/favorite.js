'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    cryptoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Crypto',
        key: 'id'
      }
    }
  }, {});
  Favorite.associate = function(models) {
  };
  return Favorite;
};