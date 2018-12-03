$(document).ready(function () {

  // $("#get-started").on("click", ".submit", function(event) {
  $("#get-started").on("click", function (event) {
    event.preventDefault();
    var gameName = $("#game-name").val().trim();
    var dollarSpend = $("#dollar-spend").val().trim();
    console.log("gameName: " + gameName);
    console.log("dollarSpend: " + dollarSpend);
    var frontEndFilesRoute = "/gamespecs"; // This is what we're using!
    var postDataURL = frontEndFilesRoute;
    console.log('postDataURL: ' + postDataURL);
    var gameSpec = {
      "gameName": gameName,
      "dollarSpend": dollarSpend
    }
    console.log('gameSpec: ', gameSpec);

    $.ajax({
      url: postDataURL,
      method: "POST",
      data: gameSpec,
      success: function (response) {
        console.log("Game Details AJAX response: ", response);
      },
      error: function () {
        alert("Game Specs AJAX response error");
      }
    });
  });
});