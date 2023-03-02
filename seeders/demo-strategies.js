"use strict";

/** @type {import('sequelize-cli').Migration} */

const db = require("../models");
const { UserStrategy } = db;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "strategies",
      [
        {
          symbol: "AAPL",
          short_term_sma_buy: 50,
          long_term_sma_buy: 200,
          short_term_sma_sell: 50,
          long_term_sma_sell: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          symbol: "BABA",
          short_term_sma_buy: 50,
          long_term_sma_buy: 100,
          short_term_sma_sell: 50,
          long_term_sma_sell: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          symbol: "TSLA",
          short_term_sma_buy: 20,
          long_term_sma_buy: 50,
          short_term_sma_sell: 20,
          long_term_sma_sell: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          symbol: "DIS",
          short_term_sma_buy: 50,
          long_term_sma_buy: 200,
          short_term_sma_sell: 50,
          long_term_sma_sell: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          symbol: "CRM",
          short_term_sma_buy: 50,
          long_term_sma_buy: 100,
          short_term_sma_sell: 50,
          long_term_sma_sell: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { include: [UserStrategy] }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("strategies", null, {
      include: [UserStrategy],
    });
  },
};
