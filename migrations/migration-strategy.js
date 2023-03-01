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
      ticker: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          validateTicker: function (ticker) {
            if (!/^[A-Z]{1,5}$/.test(ticker)) {
              throw new Error("Invalid ticker.");
            }
          },
        },
      },
      short_term_sma_buy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      long_term_sma_buy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      short_term_sma_sell: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      long_term_sma_sell: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      percentage_shares_buy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      percentage_shares_sell: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
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
