// NPM / Requires
var express = require("express");
// var Game_Details = require("../models/game-details.js")()
var db = require("../models")
// var orm = require("../config/orm.js");

console.log("FILE: gifts_controller.js ACTIVE");

module.exports = function (app) {
  
  // Global Variables
  var activePlayerNumber = 1; // Get /playgame route
  
  // -------------------------
  // GET ROUTE
  // -------------------------
  // c-R-ud: READ
  app.get("/", function (req, res) {
    // console.log("app.GET/ in gifts_controller-routes just got hit!");
    // gameDetails.getAllGifts(req, res);
    // console.log("req.body: ", req.body);
    // Object {} being passed to render for HANDLEBARS can work with it.
    res.render("admin", {});
  });

  
  
  app.get("/playgame", function (req, res) {
    console.log("app.GET/playgame in gifts_controller-routes just got hit!");
    // gameDetails.getAllGifts(req, res);
    console.log("req.body: ", req.body);
    // Object {} being passed to render for HANDLEBARS can work with it.




    // db.player_details.findAll({
    //   // limit: 1,
    //   where: {
    //     id: activePlayerNumber
    //   }
    // }).then(function(activePlayer){
    //   db.player_details.update({dataValues: "SELECTING"})
    //   console.log("Active Player")
    //   console.log(activePlayer)
    //   activePlayerNumber++;
    // })

    db.gift_details.findAll({
    }).then(function (theGifts) {
      db.player_details.findAll({
      }).then(function (thePlayers) {
        db.player_details.update(
          { player_state: "SELECTING" },
          { where: { id: activePlayerNumber } }
        ).then(function (activePlayerID) {
          db.player_details.findAll({
            where: {
              player_state: "SELECTING"
            }
          }).then(function (activePlayer) {
            activePlayerNumber++;
            
            console.log("in the game");
            console.log("theGifts:", theGifts);
            console.log("thePlayers:", thePlayers);
            console.log("Active Player ID: ", activePlayerID);
            console.log("Active Player:", activePlayer);
            console.log("Active Player Number VAR: ", activePlayerNumber);

            res.render("playgame", {
              listOfGifts: theGifts,
              listOfPlayers: thePlayers,
              activePlayer: activePlayer
            });
          })
        })
      })
    })
  });

  // -------------------------
  // POST ROUTES
  // -------------------------
  // c-r-U-d: UPDATE
  app.post('/playgame', function (req, res) {
    console.log("app.POST/:id in gifts_controller-routes.js got hit!");
    console.log("req.params.id: ", req.params.id);
    // console.log("this", this);
    console.log("req.body", req.body);
    // gameDetails.updateGift(req, res);
    res.render("playgame", {});
  });

  // C-r-u-d: CREATE Game Details
  app.post('/gamespecs', function (req, res) {
    // console.log("app.POST GAME-SPECS in gifts_controller-routes.js got hit!");
    // console.log("req.body: ", req.body);
    // console.log("Hitting Post")
    // console.log("db.game_details: ", db.game_details);
    // console.log(db.gameDetails)
    // console.log(db.Game_Details);

    //Code for posting / creating to DB

    db.game_details.create({
      game_name: req.body.gameName,
      gift_dollar_max: req.body.dollarSpend
    }).then(function (gameDetailsUpdate) {
      // console.log("DB Updated");
      // console.log("gameDetailsUpdate: ",  gameDetailsUpdate); // Object!
      // Object being passed to render for HANDLEBARS can work with it.
      res.render("players", gameDetailsUpdate.dataValues); // Works
    });
  });

  // C-r-u-d: CREATE Player Details
  app.post('/playerspecs', function (req, res) {
    // console.log("app.POST PLAYER-SPECS in gifts_controller-routes.js got hit!");
    // console.log("req.body: ", req.body);
    // console.log("Hitting Post Players")
    // console.log("db.game_details: ", db.player_details, db.gift_details);
    // console.log(db.gameDetails)
    // console.log(db.Game_Details);

    //Code for posting / creating to DB

    db.player_details.create({
      player_name: req.body.playerName,
      player_pic: req.body.playerPic,
      // player_sequence: null,
      // player_gift_disallowed: null,
      player_state: "ENROLLED"
    }).then(db.gift_details.create({
      gift_name: req.body.giftName,
      gift_pic: req.body.giftPic,
      gift_state: "WRAPPED"
    }))

    db.game_details.findAll({
      limit: 1,
      where: {

      },
      order: [['createdAt', 'DESC']]
    }).then(function (theGame) {
      console.log("in the game")
      console.log(theGame)
      res.render("players", theGame[0].dataValues)
    })

  })
}
