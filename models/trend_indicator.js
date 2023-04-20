"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TrendIndicator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TrendIndicator.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      tableName: "trend_indicators",
      modelName: "TrendIndicator",
    }
  );
  return TrendIndicator;
};
