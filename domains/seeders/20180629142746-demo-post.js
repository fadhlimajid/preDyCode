'use strict';

const Chance = require('chance');
const chance = new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let post = [];
    for (let i = 0; i < 30; i++) {
      post.push({
        user_id: chance.integer({ min: 1, max: 30 }),
        content: chance.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Posts', post, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
