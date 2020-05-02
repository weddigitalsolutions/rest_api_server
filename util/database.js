require("dotenv").config();
const Sequelize = require("sequelize");

const UserModel = require("../models/user");
const PostModel = require("../models/post");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "wedsolutions.mysql.dbaas.com.br",
    dialect: "mysql",
    logging: true,
  }
);

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

Post.belongsTo(User, { as: "creator" });
User.hasMany(Post);

db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: User,
  Post: Post,
};

module.exports = { db, User, Post };
