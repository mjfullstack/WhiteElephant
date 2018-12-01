// Sequalize model for Game Details

var Sequelize = require("sequelize");

var connection = require("../config/connection.js");
// var connection = require("./index.js")

// Syncs with DB



// Makes the Game Details Model available for other files (will also create a table)
module.exports = function() {
  // Game Details Model
  var Game_Details = connection.define("game_details", {
    game_name: Sequelize.STRING,
    gift_dollar_max: Sequelize.INTEGER
  });
  Game_Details.sync();
  return Game_Details;
};

// ===================================== //
// = TEMP: ADDS MWJ ORM HOMEGROWN TEMP = //
// ===================================== //

