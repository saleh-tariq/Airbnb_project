"use strict";

const relations = [
  {
    spotId: 1,
    userId: 2,
    startDate: "2025-11-19",
    endDate: "2025-12-20",
  },
  //{
  //spotId: 2,
  //userId: 1,
  //startDate: "2025-12-19",
  //endDate: "2025-12-20",
  //},
  //{
  //spotId: 3,
  //userId: 1,
  //startDate: "2025-11-21",
  //endDate: "2025-11-22",
  //},
  //{
  //spotId: 4,
  //userId: 2,
  //startDate: "2025-12-19",
  //endDate: "2025-12-20",
  //},
  //{
  //spotId: 5,
  //userId: 1,
  //startDate: "2025-11-19",
  //endDate: "2025-11-20",
  //},
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
    await queryInterface.bulkInsert("Bookings", relations, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Bookings", relations, {});
  },
};
