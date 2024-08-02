"use strict";

const reviews = [
  {
    spotId: 1,
    userId: 2,
    stars: 5,
    review: "meh",
  },
  {
    spotId: 2,
    userId: 1,
    stars: 1,
    review: "IT WAS TOTALLY AWESOMEEEE!!!",
  },
  {
    spotId: 3,
    userId: 1,
    stars: 2,
    review: "..................",
  },
  {
    spotId: 4,
    userId: 2,
    stars: 3,
    review: "AWOOOOGA",
  },
  {
    spotId: 5,
    userId: 1,
    stars: 4,
    review: "meh",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Reviews", reviews, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews", reviews, {});
  },
};
