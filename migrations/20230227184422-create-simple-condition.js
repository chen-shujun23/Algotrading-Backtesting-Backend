"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("simple_conditions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      strategy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "strategies", key: "id" },
      },
      short_moving_avg: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      relationship: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      long_moving_avg: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      buy_sell: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("simple_conditions");
  },
};
