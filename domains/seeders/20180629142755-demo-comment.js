'use strict';

const Chance = require('chance');
const chance = new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let comment = [];
    for (let i = 0; i < 30; i++) {
      comment.push({
        user_id: chance.integer({ min: 1, max: 30 }),
        post_id: chance.integer({ min: 1, max: 30 }),
        body: chance.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Comments', comment, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});

  }
};
