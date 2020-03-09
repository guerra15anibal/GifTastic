<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>;
$("button").on("click", function() {
  var animal = $(this).attr("data-animal");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);

      animalDiv.append(p, animalImage);
      $("#gifs-appear-here").prepend(animalDiv);
    }
  });
});
