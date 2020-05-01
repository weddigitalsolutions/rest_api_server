const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "post",
  {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "post",
        key: "_id",
      },
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  },
  {
    tableName: "post",
    timestamps: true,
  }
);
