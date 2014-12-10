
var div_h = $("#tale").height();
var div_w = $("#tale").width();

var demarcations;

var num_of_winds= 70;

var ne_winds= [];
var nw_winds= [];
var nw2_winds= [];
var sw_winds= [];
var sw2_winds= [];
var se_winds= [];

function setup(){
	background(192, 192, 192);
	var tale_canvas = createCanvas(div_w + 40, div_h + 40);
	tale_canvas.parent('canvas_and_tale');
	tale_canvas.id('canvas');
	demarcations = Math.round(height/6);

	for(var i=0; i< num_of_winds; i++){
		wind_obj= new wind_ne();
		ne_winds.push(wind_obj);
	}
	for(var i=0; i< num_of_winds; i++){
		wind_obj= new wind_nw();
		nw_winds.push(wind_obj);
	}
	for(var i=0; i< num_of_winds; i++){
		wind_obj= new wind_nw_2();
		nw2_winds.push(wind_obj);
	}
	for(var i=0; i< num_of_winds; i++){
		wind_obj= new wind_sw();
		sw_winds.push(wind_obj);
	}
	for(var i=0; i< num_of_winds; i++){
		wind_obj= new wind_sw_2();
		sw2_winds.push(wind_obj);
	}
	for(var i=0; i< num_of_winds; i++){
		wind_obj= new wind_se();
		se_winds.push(wind_obj);
	}
}

function draw(){
	background(192, 192, 192);
	strokeWeight(2);

	stroke(255, 0, 0);
	for(var i=0; i<num_of_winds; i++){
		ne_winds[i].move();
		ne_winds[i].display();
	}

	stroke(101, 81, 235);
	for(var i=0; i<num_of_winds; i++){
		nw_winds[i].move();
		nw_winds[i].display();
	}

	stroke(37, 240, 92);
	for(var i=0; i<num_of_winds; i++){
		nw2_winds[i].move();
		nw2_winds[i].display();
	}
	
	stroke(202, 249, 12);
	for(var i=0; i<num_of_winds; i++){
		sw_winds[i].move();
		sw_winds[i].display();
	}

	stroke(244, 145, 0);
	for(var i=0; i<num_of_winds; i++){
		sw2_winds[i].move();
		sw2_winds[i].display();
	}

	stroke(162, 0, 255);
	for(var i=0; i<num_of_winds; i++){
		se_winds[i].move();
		se_winds[i].display();
	}
}


//wind class for winds moving north east
function wind_ne(){
	this.len= 20
	this.x1 = random(width-this.len);
	this.y1 = random((height/6)+ this.len, (height/6)*2);
	
	this.speed = 1;
}

wind_ne.prototype.move = function(){
	this.x1 += this.speed;
	if(this.x1 >= width-this.len){
		this.x1 = random(width-this.len);
	}
	this.y1 -= this.speed;
	if(this.y1 <= (height/6)+ this.len){
		this.y1 = random((height/6)+ this.len, (height/6)*2);
	}

}

wind_ne.prototype.display = function(){
	line(this.x1, this.y1, this.x1 + this.len, this.y1 - this.len);
}



//wind class for winds moving north west
function wind_nw(){
	this.len= 20
	this.x1 = random(this.len, width);
	this.y1 = random(((height/6)*3) + this.len, (height/6)*4);
	
	this.speed = 1;
}

wind_nw.prototype.move = function(){
	this.x1 -= this.speed;
	if(this.x1 <= 50){
		this.x1 = random(width-this.len);
	}
	this.y1 -= this.speed;
	if(this.y1 <= ((height/6)*3) + this.len){
		this.y1 = random(((height/6)*3) + this.len, (height/6)*4);
	}

}

wind_nw.prototype.display = function(){
	line(this.x1, this.y1, this.x1 - this.len, this.y1 - this.len);
}

//wind class for winds moving north west between 60 degrees south and 90 degrees south
function wind_nw_2(){
	this.len= 20
	this.x1 = random(this.len, width);
	this.y1 = random(((height/6)*5) + this.len, (height/6)*6);
	
	this.speed = 1;
}

wind_nw_2.prototype.move = function(){
	this.x1 -= this.speed;
	if(this.x1 <= 50){
		this.x1 = random(width-this.len);
	}
	this.y1 -= this.speed;
	if(this.y1 <= ((height/6)*5) + this.len){
		this.y1 = random(((height/6)*5) + this.len, (height/6)*6);
	}

}

wind_nw_2.prototype.display = function(){
	line(this.x1, this.y1, this.x1 - this.len, this.y1 - this.len);
}

//wind class for winds moving south west
function wind_sw(){
	this.len= 20
	this.x1 = random(this.len, width);
	this.y1 = random(((height/6)*2) + this.len, (height/6)*3);
	
	this.speed = 1;
}

wind_sw.prototype.move = function(){
	this.x1 -= this.speed;
	if(this.x1 <= 50){
		this.x1 = random(width-this.len);
	}
	this.y1 -= this.speed;
	if(this.y1 <= ((height/6)*2)+this.len){
		this.y1 = random(((height/6)*2)+ this.len, ((height/6)*3)-30);
	}

}

wind_sw.prototype.display = function(){
	line(this.x1, this.y1, this.x1 - this.len, this.y1 + this.len);
}

//wind class for winds moving south west
function wind_sw_2(){
	this.len= 20
	this.x1 = random(this.len, width);
	this.y1 = random(0, (height/6));
	
	this.speed = 1;
}

wind_sw_2.prototype.move = function(){
	this.x1 -= this.speed;
	if(this.x1 <= 50){
		this.x1 = random(width-this.len);
	}
	this.y1 -= this.speed;
	if(this.y1 <= 0){
		this.y1 = random(0, (height/6));
	}

}

wind_sw_2.prototype.display = function(){
	line(this.x1, this.y1, this.x1 - this.len, this.y1 + this.len);
}

//wind class for winds moving south east
function wind_se(){
	this.len= 20
	this.x1 = random(width-this.len);
	this.y1 = random(((height/6)*4) + this.len, (height/6)*5);
	
	this.speed = 1;
}

wind_se.prototype.move = function(){
	this.x1 += this.speed;
	if(this.x1 >= width-this.len){
		this.x1 = random(width-this.len);
	}
	this.y1 += this.speed;
	if(this.y1 >= (height/6)*5){
		this.y1 = random(((height/6)*4)+ this.len, ((height/6)*5)-30);
	}

}

wind_se.prototype.display = function(){
	line(this.x1, this.y1, this.x1 + this.len, this.y1 + this.len);
}


$(document).ready(function(){
	console.log("We're a go!");
	$("#flow_cntrl").css("display", "inline-block");
});