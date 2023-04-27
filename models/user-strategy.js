"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserStrategy extends Model {
    static associate(models) {
      // define association with User model
      UserStrategy.belongsTo(models.User, {
        foreignKey: "user_email",
        targetKey: "email",
      });
      // define association with StrategySMA model
      UserStrategy.belongsTo(models.StrategySMA, {
        foreignKey: "strategySMA_id",
        targetKey: "id",
      });
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
      user_email: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: "users", key: "email" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      strategySMA_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "strategiesSMA", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
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
