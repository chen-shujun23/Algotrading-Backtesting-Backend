"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("strategies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ticker: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      capital: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      investment_horizon: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      stop_loss: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      is_history: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("strategies");
  },
};
