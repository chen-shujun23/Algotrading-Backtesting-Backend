"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users-strategies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
      },
      strategy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "strategies", key: "id" },
      },
      capital: {
        allowNull: false,
        type: Sequelize.FLOAT,
        validate: { isFloat: true },
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: { isDate: true },
      },
      investment_horizon: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      is_history: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        validate: {
          isBoolean: function (val) {
            return typeof val == "boolean";
          },
        },
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
    await queryInterface.dropTable("users-strategies");
  },
};
