// NPM / Requires
var express = require("express");
// var Game_Details = require("../models/game-details.js")()
var db = require("../models")
// var orm = require("../config/orm.js");
// As always, we grab the fs package to handle read/write.
var fs = require("fs");


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

  app.post("/playgame/", function (req, res) {
    console.log("app.GET/playgame in gifts_controller-routes just got hit!");

    var giftID = Number(req.body.gift_id);
    var nextPlayerNumber = activePlayerNumber + 1; // Proposed unless a steal interrupts this sequence
    var previousPlayerNumber = activePlayerNumber - 1; // Assumed if NO stealing happens... now needs to be saved at apporpriate time
    var stolenPlayerNumber; // = previousPlayerNumber - 1;
    console.log("Active Player Number: ", activePlayerNumber);
    console.log("Previous Player Number: ", previousPlayerNumber);
    console.log("Stolen Player Number: ", stolenPlayerNumber);
    console.log("NEXT Player Number: ", nextPlayerNumber); // MWJ Add
    var globalGiftState = [];

    db.gift_details.findAll({
      where: { id: giftID }
    }).then(function (theGiftsState) {

      // MWJ
      // Save player ID of the victim of this theft crime...
      // Use ONLY IF this play is found to be a steal (i.e. NOT null)!
      // Collect value here BEFORE database starts changing!
      var MWJstolenFromPlayer = theGiftsState[0].gift_player_id;
      console.log("globalGiftState[0].gift_state: ", theGiftsState[0].gift_state);
      console.log("MWJstolenFromPlayer: ", MWJstolenFromPlayer);

      // Set gift state to next status

      console.log("Setting gift state.");
      globalGiftState = theGiftsState;
      console.log("globalGiftState[0].gift_state: ", globalGiftState[0].gift_state);
      switch (globalGiftState[0].gift_state) {
        case "WRAPPED":
          return db.gift_details.update(
            {
              gift_state: "UNWRAPPED",
              gift_player_id: activePlayerNumber
            },
            { where: { id: giftID } }
          );
          break;
        case "UNWRAPPED":
          // This was a steal, MWJstolen... S/B NOT null
          if (MWJstolenFromPlayer) { nextPlayerNumber = MWJstolenFromPlayer };
          return db.gift_details.update(
            {
              gift_state: "STOLEN",
              gift_player_id: activePlayerNumber
            },
            { where: { id: giftID } }
          );
          break;
        case "STOLEN":
          // This was a steal, MWJstolen... S/B NOT null
          if (MWJstolenFromPlayer) { nextPlayerNumber = MWJstolenFromPlayer };
          return db.gift_details.update(
            {
              gift_state: "DEAD",
              gift_player_id: activePlayerNumber
            },
            { where: { id: giftID } }
          );
          break;
        default:
          console.log('ERROR: default case in ---> globalGiftState[0].gift_state <---');
          break;
      }
    }).then(function () { // remove closing ) of previous then
      return db.gift_details.findAll({
        where: { id: giftID }
      })
    }).then(function (theGiftsState) {  // remove closing ) of previous then

      // Set Player State when gifts are STOLEN or DEAD

      // Works if you steal from previous person, but does not work if you steal from another person
      // Sequence then breaks as well for user Selecting, doesn't reconize DONE
      globalGiftState = theGiftsState;
      console.log("Global Gift State: ", globalGiftState[0].gift_state); // Prior State
      console.log("Current Gift State: ", theGiftsState[0].gift_state);

      console.log("Set player state when gifts are Stolen or Dead.")
      console.log("Global gift state: ", globalGiftState[0].gift_state)
      if (globalGiftState[0].gift_state === "STOLEN" || globalGiftState[0].gift_state === "DEAD") {
        return db.player_details.update(
          { player_state: "SELECTING" },
          // { where: { id: previousPlayerNumber } }
          { where: { id: nextPlayerNumber } } // nextPlayerNumber set to MWJstolenPlayerNumber above when we determined this play was a steal
        ).then(function (activePlayerID) {
          console.log("Active Player ID: ", activePlayerID);
          // activePlayerNumber++;
          return db.player_details.update(
            { player_state: "DONE" },
            { where: { id: activePlayerNumber } }
          )
          activePlayerNumber++; // Unreachable Code via above return statement
        })
      } else {
        return;
      }// end of IF (globalGiftState[0].gift_state === "STOLEN" || globalGiftState[0].gift_state === "DEAD")
    }).then(function () {  // remove closing ) of previous then

      // Set Player state when gifts are UNWRAPPED
      console.log("Set player state when gifts are UNWRAPPED.")
      console.log("Global gift state: ", globalGiftState[0].gift_state);

      if (globalGiftState[0].gift_state === "UNWRAPPED") {
        return db.player_details.update(
          { player_state: "DONE" },
          { where: { id: activePlayerNumber } }
        ).then(function (activePlayerID) {
          console.log("Active Player ID: ", activePlayerID);
          // activePlayerNumber++;
          return db.player_details.update( // 
            { player_state: "SELECTING" },
            { where: { id: nextPlayerNumber } }
          )
          // activePlayerNumber++; // Correct, but only if NOT stolen 
          // activePlayerNumber = nextPlayerNumber; // Correct, for either case as determined and set accordingly above. 
          // })  // remove closing }) of previous then
          // }
        })
      } else {
        return
      }
    }).then(function () { // remove closing }) of previous then
      activePlayerNumber = nextPlayerNumber; // Correct, for either case as determined and set accordingly above. 

      // Get game details

      console.log("Get game details for res.render Playgame page")

      db.gift_details.findAll({
      }).then(function (theGifts) {
        db.player_details.findAll({
        }).then(function (thePlayers) {
          db.player_details.findAll({
            where: {
              player_state: "SELECTING"
            }
          }).then(function (activePlayer) {
            console.log("Active Player Number after Get Play Game: ", activePlayerNumber)

            // console.log("in the game");
            // console.log("theGifts:", theGifts);
            // console.log("thePlayers:", thePlayers);
            // console.log("Active Player:", activePlayer);


            res.render("playgame", {
              listOfGifts: theGifts,
              listOfPlayers: thePlayers,
              activePlayer: activePlayer
            });
          });
        });
      });
    })
  })
  // end of IF(globalGiftState[0].gift_state === "UNWRAPPED")

  // end of app.post("/playgame")


  // -------------------------
  // POST ROUTES
  // -------------------------
  // c-R-u-d: READ
  app.get('/playgame', function (req, res) {

    // Initiate Active Player
    if (activePlayerNumber = 1) {
      db.player_details.update(
        { player_state: "SELECTING" },
        { where: { id: activePlayerNumber } }
      )
    }
    console.log("At START OF GAME, Active Player Number: ", activePlayerNumber);

    // Gather data to display to page
    db.gift_details.findAll({
    }).then(function (theGifts) {
      db.player_details.findAll({
      }).then(function (thePlayers) {
        db.player_details.findAll({
          where: {
            player_state: "SELECTING"
          }
        }).then(function (activePlayer) {

          // console.log("in the game");
          // console.log("theGifts:", theGifts);
          // console.log("thePlayers:", thePlayers);
          // console.log("Active Player:", activePlayer);


          res.render("playgame", {
            listOfGifts: theGifts,
            listOfPlayers: thePlayers,
            activePlayer: activePlayer
          });
        })
      })
    })
  })


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
      // player_pic: req.body.playerPic,
      // player_pic: '<img class="player-pic" src=' + req.body.playerPic+ 'alt="Player Pic">' ,
      player_pic: 'src=' + req.body.playerPic,
      // player_sequence: null,
      // player_gift_disallowed: null,
      player_state: "ENROLLED"
    }).then(db.gift_details.create({
      gift_name: req.body.giftName,
      // gift_pic: req.body.giftPic,
      // gift_pic: '<img class="gift-pic" src=' + req.body.giftPic + 'alt="Gift Pic">' ,
      gift_pic: 'src=' + req.body.giftPic,
      gift_state: "WRAPPED"
    }).then(db.game_details.findAll({
      limit: 1,
      where: {
      },
      order: [['createdAt', 'DESC']]
    }).then(function (theGame) {
      // console.log("in the game")
      // console.log(theGame)
      res.render("players", theGame[0].dataValues)
    })
    )
    )
  })

  app.get("/public/assets/img/:file", function (req, res) {
    var pic2get = req.params.file;
    console.log("pic2get: ", pic2get);
  })
}