const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models/post");

const feedRoutes = require("./routes/feed");
const sequelize = require("./util/database");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((error) => console.log(error));
