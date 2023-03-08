"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Strategy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Strategy.belongsToMany(models.User, {
        through: models.UserStrategy,
        foreignKey: "strategy_id",
      });
    }
  }
  Strategy.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      symbol: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          validateTicker: function (ticker) {
            if (!/^[A-Z]{1,5}$/.test(ticker)) {
              throw new Error("Invalid ticker.");
            }
          },
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
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
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: { isDate: true },
      },
      sSMA: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      lSMA: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      qty_shares: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
    },
    {
      sequelize,
      tableName: "strategies",
      modelName: "Strategy",
    }
  );
  return Strategy;
};
