'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'User',
          key : 'id'
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull : false,
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull : false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull : false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });

    await queryInterface.addIndex(['address', 'city', 'state'], {unique: true})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(["address", "city", "state"], { unique: true });
    await queryInterface.dropTable('Spots');
  }
};