'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('users', [
      { id: 1, firstName: '太郎', lastName: '田中',  email: 'taro@example.com', createdAt: now, updatedAt: now},
      { id: 2, firstName: '次郎', lastName: '山田',  email: 'jiro@example.com', createdAt: now, updatedAt: now},
      { id: 3, firstName: '三郎', lastName: '佐藤',  email: 'saburo@example.com', createdAt: now, updatedAt: now},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};