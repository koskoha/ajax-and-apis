

var game = function(){
	var queryButtons = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup plg', 'serval', 'salamander', 'frog'];

	function addButton(buttName){
		var button = $('<button class ="btn"></button>');
		button.attr('data-value',buttName);
		button.html(buttName);
		$('#queryButtons').append(button);
		
	}

	return{
		renderButtons: function (buttName){
			for (var i = 0; i < queryButtons.length; i++) {
				addButton(queryButtons[i]);
			}
		},

		printButton: function (buttName){
			if (buttName != "" ){
				addButton(buttName);
			}
		},

		queryGifs(query){
			var imagesField = $('#gifsBlock');
			imagesField.empty();
		    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		        query + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
		        url: queryURL,
		        method: "GET"
		      	}).done(function(response) {
		      		console.log(response);
		      		console.log(response.data.length);
			      	for (var i = 0; i < response.data.length; i++) {
			      		var field = $('<div class="block"></div>');
				       	var image = $('<img>');
			      		field.html("<p>Rating: "+response.data[i].rating+"</p>");
				       	image.attr("src",response.data[i].images.fixed_height_still.url);
				       	image.attr("data-still",response.data[i].images.fixed_height_still.url);
				       	image.attr("data-animate",response.data[i].images.fixed_height.url);
				       	image.attr("data-state","still");
			      		field.append(image);
			      		imagesField.append(field);
			      	}
		      	});
		},

		animationPlay: function(gif){
			var state = gif.attr("data-state");
		       if (state === "still") {
		         gif.attr("src", gif.attr("data-animate"));
		         gif.attr("data-state", "animate");
		       } else {
		         gif.attr("src", gif.attr("data-still"));
		         gif.attr("data-state", "still");
		       }
		}

	};


};

$(document).ready(function(){
	var newGame = game();

	newGame.renderButtons();

	$('#submit').click(function(event){
		event.preventDefault();
		newGame.printButton($('#inputQuery').val());
		$('#inputQuery').val("");
	});

	$('#queryButtons').on('click', 'button' , function(){
		newGame.queryGifs($(this).data("value"));
	});

	$('#gifsBlock').on("click", 'img',function(){
		newGame.animationPlay($(this));
	});
});
