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
          given_name: "Amanda",
          family_name: "Ang",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          google_acc: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "benjamin@example.com",
          id: uuidv4(),
          given_name: "Benjamin",
          family_name: "Boon",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          google_acc: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "charlie@example.com",
          id: uuidv4(),
          given_name: "Charlie",
          family_name: "Chong",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          google_acc: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "dorothy@example.com",
          id: uuidv4(),
          given_name: "Dorothy",
          family_name: "Daniels",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          google_acc: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "elizabeth@example.com",
          id: uuidv4(),
          given_name: "Elizabeth",
          family_name: "Eng",
          password: await bcrypt.hash("example123$", 10),
          is_admin: false,
          google_acc: false,
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
