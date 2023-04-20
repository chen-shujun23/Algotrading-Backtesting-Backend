"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Strategy, {
        through: models.UserStrategy,
        foreignKey: "user_email",
      });
    }
  }
  User.init(
    {
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
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
