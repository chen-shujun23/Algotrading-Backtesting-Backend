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
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ticker: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      capital: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      investment_horizon: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      stop_loss: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      is_history: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
