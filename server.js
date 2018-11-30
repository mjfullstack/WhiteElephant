// NPM Stuff...
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var gameDetails = require("./models/game-details.js")

var app = express();
var PORT = process.env.PORT || 3000;

// MIDDLEWARE --- Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// This app.use is required because we need to open up the "static"
// resources and open it to the public. Normally, a website will use
// resources that are "dynamic" and exist elsewhere. In this case,
// our resources all reside in the same place so we just need to tell
// it so.
app.use((express.static(path.join(__dirname,"/public"))));
console.log("path.join(__dirname, /public)", path.join(__dirname,"./public"));

// This is WRONG because:
// app.use((express.static(path.join(__dirname,"./views/layouts")))); 
// 1. The files in this directory DO change... are NOT  static, via handlebars, and
// 2. Handlebars GENERATES "index.html" which acts like it is in public (I think)

var exphbs = require("express-handlebars");

// HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Required Server Files
// var htmlRoutes = require("./routing/html-routes.js")(app);
// var apiRoutes = require("./controllers/burgers_controller.js")(app);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

