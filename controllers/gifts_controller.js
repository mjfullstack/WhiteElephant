// NPM / Requires
var express = require("express");
var gameDetails = require("../models/game-details.js")
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
    var gameDetails = {
      "gameName"    : req.body.gameName,
      "dollarSpend" : req.body.dollarSpend
    };
    console.log("gameDetails.gameName: ", gameDetails.gameName);
    console.log("gameDetails.dollarSpend: ", gameDetails.dollarSpend);
    // gameDetails.addNewGift(req, res);
    res.status(200).json(gameDetails).end("Server Saw It!");
  });
};

