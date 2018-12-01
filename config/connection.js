// Connection to DB

var Sequelize = require("sequelize");

var sequelize = new Sequelize("white_elephant_db", "root", process.env.SEQUELIZE_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  // user: "root",
  // passowrd: process.env.SQLPASS,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;