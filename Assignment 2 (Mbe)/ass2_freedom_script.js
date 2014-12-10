
var real_country= false;
var myip;
var passage1, passage2, passage3, passage4, passage5, passage6, passage7, passage8, passage9;
var paragraphs;
// var number_of_balls;
var base_popul = 1357380000; //largest possible population China
var int_country_pop;
var str_country_pop ="";


function process_country(){
	var country_input = prompt("Please enter a country", "Country Name");
	var country_entered = ""; //normalized version of input

	if(country_input == null){
		alert("It won't work if you don't enter a country. Reload the page and enter a country name... or any text at all");
		console.log("No text was entered");
		return;
	}
	
	else{
		for(var i=0; i< country_input.length; i++){
			if(country_input[i] == ' '){
				if(i == 0 || country_input[i+1] == " " || country_input[i+1] == undefined || country_input[i-1] == " "){
					console.log("not needed space");
				}
				else{
					country_entered += country_input[i];
				}
			}
			else if(i == 0 || country_input[i-1] == " "){
				country_entered += country_input[i].toUpperCase();
			}
			else{
				country_entered += country_input[i].toLowerCase();
			}
		}
	}

	console.log(country_entered);

	getCountryPop(country_entered);
}

var runtimes= 0;

function get_num_balls(thing){
	var new_thing = "";
	for(var i=0; i<thing.length; i++){
		if(thing[i] != ","){
			new_thing += thing[i];
		}
	}
	str_country_pop = new_thing; 
	int_country_pop = parseInt(str_country_pop);

	return number_of_balls = Math.round((int_country_pop/base_popul) * 1000); //the number of balls in the canvas, which is proportional to the country's population
}

function getCountryPop(country){
	runtimes ++;
	var URL= "https://www.kimonolabs.com/api/bezjuxp8?apikey=rOt4I4xA7iyXm7BcU681cr2DeJnDAQgk";
	console.log(country);

	$.ajax({
		"url": URL,
		"crossDomain": true,
		dataType: "jsonp",
		error: function(){
			console.log("Oh no, population fnctn not wrking...");
		},
		success: function(data){
			console.log("POPULATIONS ARE HERE!!!");

			console.log(data);
			// console.log(data.results.collection1); //list of objects
			var country_array = data.results.collection1;

			for(var i=0; i< country_array.length; i++){
				if(country_array[i].country_name.text == country){
					real_country = true;
					country_pop = country_array[i].country_population;
					$("#canvas_tag").append(country);
					$("#canvas_tag").append(" with a population of ");
					$("#canvas_tag").append(country_pop);

					if(runtimes == 2){
						$("#canvas_tag").append(" (It's seems you entered gibberish so we took the liberty of using your present location)");
					}

					$("#loading").css("display", "none");
					$("#flow_cntrl").css("display", "inline-block");
					setTimeout( function(){ $("#hint").css("display", "inline-block"); }, 1000);

					console.log(country_pop);

					var val = get_num_balls(country_pop);
					console.log("The number of balls in the canvas is...");
					console.log(val);

					passage1= "A friend once told me that we are never free. ";
					passage2= "He gave this 'peculiar' analogy to explain his 'thesis'. ";
					passage3= "Like the blue ball, he said I should imagine that was me (or you or anybody). The ball lives in that box. ";
					passage4= "That seems like a good thing right? I mean, that whole box, all to himself. But, of course, everyone has to live somewhere. ";
					passage5= "Okay, let's say he lives in " + country + ". ";
					if(country_pop.length >= 11 ){
						passage6= "Aha! Other balls (people). That's a population of about "+ country_pop +". (That's a LOT of people... poor blue ball)";
					}
					else{
						passage6= "Aha! Other balls (people). That's a population of about "+ country_pop +". Not too many people but still, the blue ball no longer owns the box";
					}
					passage7= ". The prescence of these people doesn't take away our blue ball's freedom, but it's obvious that he can move around as before.";
					passage8= " Nevertheless, is he still free? Or is he just not free to be free? ";
					passage9= " Doesn't make sense? Well, in my defense, I met him at <a href='http://dc.wikia.com/wiki/Arkham_Asylum' target='_blank'>Arkham</a>...";

					paragraphs = [passage1, passage2, passage3, passage4, passage5, passage6, passage7, passage8, passage9];

					
				}//end of if statement
			}//end of for loop

			

			if(real_country == false){
				console.log("got here!");
				$.ajax({
					url: "http://freegeoip.net/json/"+myip,
					dataType: "jsonp",
					type: "GET",
					success: function(data){
						console.log(data);
						country = data.country_name;
						getCountryPop(country);
					}
				})
			}

		}
	});
}





/******************************************************************************************************/
/*p5 stuff*/

var myballs = [];
var main_ball;


var div_h= $("#tale").height();
var div_w = $("#tale").width();


var story_stages= [1, 2];
var story_ptr = 0;

function preload(){
	while(number_of_balls == NaN){
		console.log("number_of_balls is still not a number");
	}

	console.log("number_of_balls is now " + number_of_balls.toString() );
}

function setup(){
	 var tale_canvas=  createCanvas(div_w + 40, div_h + 40);
	 tale_canvas.parent('canvas_and_tale');
	 tale_canvas.id('canvas');
	 for(var i=0; i < number_of_balls; i++){
	 	ball_obj= new ball();
	 	myballs.push(ball_obj);
	 }
	 // fill(0, 0, 205);
	 main_ball = new ball();
	 frameRate(10);
 }

 function draw(){
 	background(192, 192, 192);

 	if(story_ptr >= 2){
 		fill(255, 255, 255);

 		strokeWeight(0.25);
 	
 		for(var i=0; i< myballs.length; i++){
 			myballs[i].move();
 			myballs[i].display();
 		}
 	}

 	if(story_ptr >= 1){
 		fill(0, 0, 205);
 		noStroke();
 		main_ball.move();
 		main_ball.display();
 	}
 }



 // ball class
function ball() {
	this.x = random(width);
	this.y = random(height);
	this.diameter = 35;
	this.speed = 20;
}

ball.prototype.move = function(){
	var movx = round(random(0, 1)); // decide if it will be += or -=
	if(movx == 1){
		this.x += random(-this.speed, this.speed);
	}
	else{
		this.x -= random(-this.speed, this.speed);
	}
	//make sure it doesn't leave
	if(this.x >= width){
		this.x = width;
	}
	else if(this.x <= 0){
		this.x = 0;
	}

	var movy = round(random(0, 1));
	if(movy == 1){
		this.y += random(-this.speed, this.speed);
	}
	else{
		this.y -= random(-this.speed, this.speed);
	}
	//make sure it doesn't leave
	if(this.y >= height){
		this.y = height;
	}
	else if(this.y <= 0){
		this.y = 0;
	}
}

ball.prototype.display = function(){
	ellipse(this.x, this.y, this.diameter, this.diameter);
}


function writer(txt){

	$("p").append(txt);
}


/************************************************************************************************/
/* when doc is ready */

$(document).ready(function(){
	console.log("We're a Go!");

	console.log(myip);

	process_country();



	var i= -1;

	var no_use = 1;

	$("#flow_cntrl").click(function(){
		console.log("clicked!!");
		$("#hint").css("display", "none");
		no_use++;
		console.log(no_use);

		var my;
		console.log(i);

		if(i < (paragraphs.length)){
			i++;
		}

		if(i == 2){
			story_ptr = 1;
		}

		if(i == 5){
			story_ptr = 2;
			$("#canvas_tag").css("display", "block");
		}

		if(no_use > 100){
			$("#next_scene").css("display", "inline");
		}

		setTimeout(function(){ if(i <= paragraphs.length-1){ writer(paragraphs[i]); } else{ /*clearInterval(my);*/ }}, 20);

		my;
	});

	


});