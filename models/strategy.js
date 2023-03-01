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
      ticker: {
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
      short_term_sma_buy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      long_term_sma_buy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      short_term_sma_sell: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      long_term_sma_sell: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      percentage_shares_buy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
      },
      percentage_shares_sell: {
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
