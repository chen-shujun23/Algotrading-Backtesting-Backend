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
      symbol: {
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
      title: {
        allowNull: false,
        type: Sequelize.STRING,
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
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: { isDate: true },
      },
      sSMA: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      lSMA: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      qty_shares: {
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
