// NPM / Requires
var express = require("express");
// var Game_Details = require("../models/game-details.js")()
var db = require("../models")
// var orm = require("../config/orm.js");

console.log("FILE: gifts_controller.js ACTIVE");

module.exports = function(app) {
  // -------------------------
  // GET ROUTE
  // -------------------------
  // c-R-ud: READ
  app.get("/", function(req, res) {
    console.log("app.GET/ in gifts_controller-routes just got hit!");
    // gameDetails.getAllGifts(req, res);
    console.log("req.body: ", req.body);
    // var gameDetails = [{
    //   "gameName"    : req.body.gameName,
    //   "dollarSpend" : req.body.dollarSpend
    // }];
    res.render("home", {});
    // Object being passed to render for HANDLEBARS can work with it.
  });

  // -------------------------
  // POST ROUTES
  // -------------------------
  // c-r-U-d: UPDATE
  app.put('/devoured/:id', function(req, res) {
    console.log("app.PUT in gifts_controller-routes.js got hit!");
    // gameDetails.updateGift(req, res);
  });

  // C-r-u-d: CREATE
  app.post('/gamespecs', function(req, res) {
    console.log("app.POST in gifts_controller-routes.js got hit!");
    console.log("req.body: ", req.body);
    console.log("Hitting Post")
    console.log("db.game_details: ",  db.game_details);
    // console.log(db.gameDetails)
    // console.log(db.Game_Details);

    //Code for posting / creating to DB
    
    db.game_details.create({
      game_name: req.body.gameName,
      gift_dollar_max: req.body.dollarSpend
    }).then(function(gameDetailsUpdate) {
      console.log("DB Updated");
      // console.log("gameDetailsUpdate: ",  gameDetailsUpdate); // Object!
      // Object being passed to render for HANDLEBARS can work with it.
      res.render("single", gameDetailsUpdate.dataValues); // Works
    });
  });
};

