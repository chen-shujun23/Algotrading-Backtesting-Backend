"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          validateName: function (name) {
            if (!/^[A-Za-z ]+$/.test(name)) {
              throw new Error("Invalid name.");
            }
          },
        },
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: { isAlpha: true },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_admin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        validate: {
          isBoolean: function (val) {
            return typeof val == "boolean";
          },
        },
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
    await queryInterface.dropTable("users");
  },
};
