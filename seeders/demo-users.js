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
          email: "amanda@example.com",
          id: uuidv4(),
          first_name: "Amanda",
          last_name: "Ang",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "benjamin@example.com",
          id: uuidv4(),
          first_name: "Benjamin",
          last_name: "Boon",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "charlie@example.com",
          id: uuidv4(),
          first_name: "Charlie",
          last_name: "Chong",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "dorothy@example.com",
          id: uuidv4(),
          first_name: "Dorothy",
          last_name: "Daniels",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "elizabeth@example.com",
          id: uuidv4(),
          first_name: "Elizabeth",
          last_name: "Eng",
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
