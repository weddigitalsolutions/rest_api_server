require("dotenv").config();
const Sequelize = require("sequelize");

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

module.exports = sequelize;
