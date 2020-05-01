const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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

module.exports = User;
