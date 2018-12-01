// Sequalize model for Game Details

var Sequelize = require("sequelize");

var connection = require("../config/connection.js");
// var connection = require("./index.js")

// Syncs with DB



// Makes the Game Details Model available for other files (will also create a table)
module.exports = function() {
  // Game Details Model
  var playerDetails = connection.define("player_details", {
    player_name: Sequelize.STRING,
    player_photo: Sequelize.STRING,
    player_sequence: Sequelize.INTEGER,
    player_gift_id: Sequelize.INTEGER,
    player_gift_disallowed: Sequelize.INTEGER,
    player_state: Sequelize.STRING
  });
  playerDetails.sync();
  return playerDetails;
};

// ===================================== //
// = TEMP: ADDS MWJ ORM HOMEGROWN TEMP = //
// ===================================== //

