/** @type {import('sequelize-cli').Migration} */
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users-strategies",
      [
        {
          user_id: "126c2e98-d44e-4024-876a-2a0db33aea1f",
          strategy_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "126c2e98-d44e-4024-876a-2a0db33aea1f",
          strategy_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "126c2e98-d44e-4024-876a-2a0db33aea1f",
          strategy_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "6d07d932-277c-445d-93a3-b084734b716f",
          strategy_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "6d07d932-277c-445d-93a3-b084734b716f",
          strategy_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "6d07d932-277c-445d-93a3-b084734b716f",
          strategy_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "24635039-a5de-47a2-8adb-811a25b90424",
          strategy_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "24635039-a5de-47a2-8adb-811a25b90424",
          strategy_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "24635039-a5de-47a2-8adb-811a25b90424",
          strategy_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "a3910a32-a192-4e1e-bf2d-e25deb06da53",
          strategy_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "a3910a32-a192-4e1e-bf2d-e25deb06da53",
          strategy_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "a3910a32-a192-4e1e-bf2d-e25deb06da53",
          strategy_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "6ae6b79d-dfcc-428e-9cf6-db44e9e7f5f3",
          strategy_id: 5,
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
