"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        validate: { isEmail: true },
      },
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,

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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
