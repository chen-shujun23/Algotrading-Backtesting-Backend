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
          ticker: "AAPL",
          short_term_sma_buy: 50,
          long_term_sma_buy: 200,
          short_term_sma_sell: 50,
          long_term_sma_sell: 200,
          percentage_shares_buy: 10,
          percentage_shares_sell: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "BABA",
          short_term_sma_buy: 50,
          long_term_sma_buy: 100,
          short_term_sma_sell: 50,
          long_term_sma_sell: 100,
          percentage_shares_buy: 10,
          percentage_shares_sell: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "TSLA",
          short_term_sma_buy: 20,
          long_term_sma_buy: 50,
          short_term_sma_sell: 20,
          long_term_sma_sell: 50,
          percentage_shares_buy: 5,
          percentage_shares_sell: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "DIS",
          short_term_sma_buy: 50,
          long_term_sma_buy: 200,
          short_term_sma_sell: 50,
          long_term_sma_sell: 200,
          percentage_shares_buy: 20,
          percentage_shares_sell: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "CRM",
          short_term_sma_buy: 50,
          long_term_sma_buy: 100,
          short_term_sma_sell: 50,
          long_term_sma_sell: 100,
          percentage_shares_buy: 10,
          percentage_shares_sell: 10,
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
