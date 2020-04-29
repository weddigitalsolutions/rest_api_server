const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    tableName: "post",
    timestamps: true,
  }
);

//console.log(Post === sequelize.models.Post);
