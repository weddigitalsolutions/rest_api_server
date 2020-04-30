const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "user",
  {
    _id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      default: "I am new!",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "post",
        key: "_id",
      },
    },
  },
  {
    tableName: "user",
    timestamps: true,
  }
);
