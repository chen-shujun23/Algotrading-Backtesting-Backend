"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StrategySMA extends Model {
    static associate(models) {
      // define association here
      StrategySMA.belongsToMany(models.User, {
        through: models.UserStrategy,
        foreignKey: "strategySMA_id",
      });
    }
  }
  StrategySMA.init(
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
      qty_shares: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true },
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
    },
    {
      sequelize,
      tableName: "strategiesSMA",
      modelName: "StrategySMA",
    }
  );
  return StrategySMA;
};
