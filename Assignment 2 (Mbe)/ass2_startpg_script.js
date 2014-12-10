
var text1= "Hello, there. ";
var text2= "Let me take you on a journey. ";
var text3= "I will expose your mind to a few thoughts. ";
var text4= "They might not make sense to you now...";
var text5= "They may never make sense... ";

function writing(passage, num){
	var letter = passage[num];

	$("#intro").append(letter);
}

function writer(txt){
	var i= -1;
	var ctr;
	ctr = setInterval(function(){ if(txt != undefined){if(i < txt.length){i++; writing(txt, i); } else{clearInterval(ctr); }} else{clearInterval(ctr); }}, 25);

	if(txt == text5){
		$("#link2freedom").css("display", "block");

		console.log("displayed");
	}
}

$(document).ready(function(){
	console.log("We're A Go!");

	$("#help").click(function(){
			if($('#basic_info').css('display') == 'none'){ 
		   		$('#basic_info').css('display', 'block'); 
			} else { 
		   		$('#basic_info').css('display', 'none'); 
			}
	});

	var texts = [text1, text2, text3, text4, text5];

	// for(var u=0; u< 5; u++){
	// 	setTimeout(texts[u], 2000);
	// }

	var e= -1;
	var my;
	my = setInterval(function(){ if(e < texts.length){e++; writer(texts[e]); } else{clearInterval(my); }}, 2000);



});