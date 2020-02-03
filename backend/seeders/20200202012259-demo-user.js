'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'ramimalek',
      firstName: 'Raphael',
      lastName: 'Palerme',
      password: '2001odySSey',
      email: 'raphael.palerme@epitech.eu',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
