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
      // define association with User model
      UserStrategy.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });

      // define association with Strategy model
      UserStrategy.belongsTo(models.Strategy, {
        foreignKey: "strategy_id",
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
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      strategy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "strategies", key: "id" },
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
