const sequelizeAuto = require("sequelize-auto");
const auto = new sequelizeAuto("wedsolutions", "wedsolutions", "dan05042004@", {
  host: "wedsolutions.mysql.dbaas.com.br",
  dialect: "mysql",
  additional: {
    timestamps: true,
  },
});

auto.run((err) => {
  if (err) throw err;
  console.log(auto.tables);
  console.log(auto.foreignKeys);
});
