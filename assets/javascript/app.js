var comedians = ["Will Ferrell", "Steve Carrell", "Larry David", "Mike Myers", "Dave Chappelle",
                 "Dana Carvey", "Jim Carrey", "Lewis Black", "David Cross"];
var apiKey = "VbXz6RzXTuAta04wBGeoFTT2kCQxYRzs";


$(document).ready(function() {

	function renderButtons() {

	    $("#button-area").html("");
	    // Loop through the array of movies, then generate buttons for each movie in the array
	    for(var i=0; i < comedians.length; i++){
	        var btn = $("<button>");
	        btn.text(comedians[i]);
	        btn.addClass("button");
	        btn.attr("data-name", comedians[i]);
	        $("#button-area").append(btn);
	    }
	}
    $("#add-subject").on("click", function(event) {

    	event.preventDefault();

    	var text = $("#subject-input").val();
    	comedians.push(text);
    	$("#subject-input").val("");
    	renderButtons();
    });

    $(document).on("click", ".button", function() {

        var subject = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+subject+"&api_key="+apiKey+"&limit=10";

        $.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {

          console.log(response);
          
          var data = response.data;
          $("#comedians").empty();

          for(var i=0; i < data.length; i++){	

          	  var imageUrl = data[i].images.fixed_height_still.url;
              var image = $("<img>");
              image.attr("src", imageUrl);
              image.attr("alt", subject);
              image.addClass("image");
              $("#comedians").append(image);
          }
        });
    });

    renderButtons();
});