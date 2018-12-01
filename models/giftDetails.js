// Sequalize model for Game Details

var Sequelize = require("sequelize");

var connection = require("../config/connection.js");
// var connection = require("./index.js")

// Syncs with DB



// Makes the Game Details Model available for other files (will also create a table)
module.exports = function() {
  // Game Details Model
  var giftDetails = connection.define("gift_details", {
    gift_name: Sequelize.STRING,
    gift_link: Sequelize.STRING,
    gift_player_id: Sequelize.INTEGER,
    player_state: Sequelize.STRING
  });
  giftDetails.sync();
  return giftDetails;
};

// ===================================== //
// = TEMP: ADDS MWJ ORM HOMEGROWN TEMP = //
// ===================================== //

