var queryButtons = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup plg', 'serval', 'salamander', 'frog'];

$(document).ready(function(){
	renderButtons();


});

function renderButtons(buttName){
	for (var i = 0; i < queryButtons.length; i++) {
		printButton(queryButtons[i]);
	}
}

function printButton(buttName){
	var button = $('<button class ="btn"></button>');
	button.attr('data-value',buttName);
	button.html(buttName);
	$('#queryButtons').append(button);
}

$('#queryButtons').on('click', 'button' , function(){
	var imagesField = $('#gifs');
	imagesField.empty();
	var query = $(this).data("value");
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
	       	image.attr("src",response.data[i].images.original.url);
      		field.append(image);
      		imagesField.append(field);
      	}
      });
});

$('#submit').click(function(event){
	event.preventDefault();
	var name = $('#inputQuery').val();
	queryButtons.push(name);
	printButton(name);
})