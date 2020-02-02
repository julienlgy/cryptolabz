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
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      currentPrice: {
        type: Sequelize.FLOAT
      },
      openingPrice: {
        type: Sequelize.FLOAT
      },
      low: {
        type: Sequelize.FLOAT
      },
      high: {
        type: Sequelize.FLOAT
      },
      imgUrl: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('Crytos');
  }
};