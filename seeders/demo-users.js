"use strict";

/** @type {import('sequelize-cli').Migration} */

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const { UserStrategy } = db;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          first_name: "Amanda",
          last_name: "Ang",
          email: "amanda@example.com",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          first_name: "Benjamin",
          last_name: "Boon",
          email: "benjamin@example.com",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          first_name: "Charlie",
          last_name: "Chong",
          email: "charlie@example.com",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          first_name: "Dorothy",
          last_name: "Daniels",
          email: "dorothy@example.com",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          first_name: "Elizabeth",
          last_name: "Eng",
          email: "elizabeth@example.com",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { include: [UserStrategy] }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, { include: [UserStrategy] });
  },
};
