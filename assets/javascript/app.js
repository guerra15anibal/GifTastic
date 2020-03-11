var gifs = ["Rick and Morty", "Futurama", "Family Guy", "American Dad"];

var button;
var searchTopic = "";

var buttonMaker = function() {
  $("#buttonBox").empty();
  for (i = 0; i < gifs.length; i++) {
    button = $("<button type=" + "button" + ">" + gifs[i] + "</button>")
      .addClass("btn btn-success top-button")
      .attr("data", gifs[i]);
    $("#buttonBox").append(button);
  }
};
buttonMaker();

$(document).on("click", ".top-button", function() {
  var thing = $(this).attr("data");
  console.log("thing: " + thing);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    thing +
    "&api_key=C01R2xURFqCz6oEkz89pIqaDGFPgxD4N&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    for (let i = 0; i < res.data.length; i++) {
      var containerDiv = $("<div>");

      var animated = res.data[i].images.fixed_height.url;
      var still = res.data[i].images.fixed_height_still.url;

      var img = $("<img>");
      img.attr("src", still);
      img.addClass("giphy-img");
      img.attr("state", "still");
      img.attr("data-animate", animated);
      img.attr("data-still", still);

      var rating = res.data[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      containerDiv.prepend(p);
      containerDiv.prepend(img);
      $(".gify-container").prepend(containerDiv);
    }
  });
});

$(document).on("click", ".giphy-img", function() {
  console.log("on click");
  var state = $(this).attr("state");
  if (state == "still") {
    var animatedUrl = $(this).attr("data-animate");
    $(this).attr("src", animatedUrl);
    $(this).attr("state", "animated");
  } else {
    var stillUrl = $(this).attr("data-still");
    $(this).attr("src", stillUrl);
    $(this).attr("state", "still");
  }
});
