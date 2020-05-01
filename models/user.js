const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "user",
  {
    _id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      default: "I am new!",
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: true,
  }
);
