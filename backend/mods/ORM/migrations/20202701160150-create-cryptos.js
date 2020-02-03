'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cryptos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentPrice: {
        type: Sequelize.FLOAT
      },
      openingPrice: {
        type: Sequelize.FLOAT //openingPrice, lower day, upper day
      },
      lowerDay: {
        type: Sequelize.FLOAT
      },
      upperDay: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cryptos');
  }
};