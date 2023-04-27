/** @type {import('sequelize-cli').Migration} */
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users-strategies",
      [
        {
          user_email: "amanda@example.com",
          strategySMA_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "amanda@example.com",
          strategySMA_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "amanda@example.com",
          strategySMA_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "benjamin@example.com",
          strategySMA_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "benjamin@example.com",
          strategySMA_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "benjamin@example.com",
          strategySMA_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "charlie@example.com",
          strategySMA_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "charlie@example.com",
          strategySMA_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "charlie@example.com",
          strategySMA_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "dorothy@example.com",
          strategySMA_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "dorothy@example.com",
          strategySMA_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "dorothy@example.com",
          strategySMA_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_email: "elizabeth@example.com",
          strategySMA_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users-strategies", null, {});
  },
};
