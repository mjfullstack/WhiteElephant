// Sequalize model for Game Details

var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

// Game Details Model
var gameDetails = sequelize.define("game_details", {
  game_name: Sequelize.STRING,
  gift_dollar_max: Sequelize.INTEGER,
  created_at: Sequelize.DATE
});

// Syncs with DB
gameDetails.sync();

// Makes the Game Details Model available for other files (will also create a table)
module.exports = Chirp;
