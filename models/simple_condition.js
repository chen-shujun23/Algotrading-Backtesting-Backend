"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Simple_condition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Simple_condition.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      strategy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "strategies", key: "id" },
      },
      short_moving_avg: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      relationship: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      long_moving_avg: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      buy_sell: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      tableName: "simple_conditions",
      modelName: "Simple_condition",
    }
  );
  return Simple_condition;
};
