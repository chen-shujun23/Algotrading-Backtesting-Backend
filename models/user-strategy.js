"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserStrategy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserStrategy.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
      },
      strategy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "strategies", key: "id" },
      },
      capital: {
        allowNull: false,
        type: Sequelize.FLOAT,
        validate: { isFloat: true },
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: { isDate: true },
      },
      investment_horizon: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      is_history: {
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
      tableName: "users-strategies",
      modelName: "UserStrategy",
    }
  );
  return UserStrategy;
};
