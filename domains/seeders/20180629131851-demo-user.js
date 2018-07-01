'use strict';

const Chance = require('chance');
const chance = new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let user = [];
    for (let i = 0; i < 30; i++) {
      user.push({
        first_name: chance.first(),
        last_name: chance.last(),
        email: chance.email(),
        password: chance.string({ length: 10 }),
        address: chance.address(),
        phone: chance.phone(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Users', user, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
