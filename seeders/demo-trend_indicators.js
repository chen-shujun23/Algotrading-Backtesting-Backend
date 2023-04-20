"use strict";

/** @type {import('sequelize-cli').Migration} */

const db = require("../models");
const { Strategy } = db;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "trend_indicators",
      [
        {
          sSMA: 50,
          lSMA: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sSMA: 50,
          lSMA: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { include: [Strategy] }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("strategies", null, {
      include: [Strategy],
    });
  },
};
