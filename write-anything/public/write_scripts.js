var divID = [];
var realData = [];
var rawData;

function saveData(obj){
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Data successfully uploaded to database!');
			console.log(resp);
		}
	});
}


function loadAllData(){
	$.ajax({
		url: '/api/all',
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("loadAllData failed...");
			console.log(data);
			console.log("Try a Refresh?");
		},
		success: function(data){
			console.log("We have data");
			console.log(data);
			rawData = data;
			for(var i=0; i< data.length; i++){
				var theText = data[i].doc.mainText;
				if (theText && theText.length > 100){
					console.log(theText);
					console.log(data[i]);
					//sendDeleteRequest(data[i].doc);
				}

				// if(data[i].doc.mainText== '<img src="http://www.cpd-india.com/blog/wp-content/uploads/2014/08/Hacked.jpg">' || data[i].doc._id== "f7ffe1a401526d20df35532b32801c8b"){
				// 	sendDeleteRequest(data[i].doc);
				// }

				if(data[i].doc.mainText !== "W" || data[i].doc.mainText !== "w" ){
					var divStr = "<div pers_id="+i.toString()+"IsTheNum style='top:"+data[i].doc.top +"px; left:"+data[i].doc.left+"px; '>"+data[i].doc.mainText+"</div>";
					$("body").append(divStr);
				}
			}

			//loadReal(rawData);
		}
	});
}

function sendDeleteRequest(obj){
	console.log(obj);
	//Make sure you want to delete
	//var conf = confirm("Are you sure you want to delete '" + obj.user + " : " + obj.word + "' ?");
	//if (!conf) return;
	//Proceed if confirm is true
	console.log("Data is being deleted...");
	$.ajax({
		url: '/delete',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Deleted!');
			console.log(resp);
			//getAllData();

			/*----------------------------------------
			//ALT APPROACH - Avoid extra request to db
			//Remove deleted obj from allData array
			allData = _.reject(allData, function(d){
				return d._id == obj._id;
			});
			//Clear out current data on the page if any
			$('#dataContainer').html('');
			var htmlString = makeHTML(allData);
			$('#dataContainer').append(htmlString);
			//Bind events to each object
			allData.forEach(function(d){
				setDeleteEvent(d);
				setUpdateEvent(d);
			});
			----------------------------------------*/
		}
	});
}

function loadReal(stuff){
	var e= 0;
	for(var i=0; i< stuff.length; i++){
		if(stuff[i].doc.mainText != "W"){
			realData[e] = stuff[i].doc.mainText;
			e++;
		}
	}

	console.log(realData);
}


$(document).ready(function(){
	console.log("We're a Go!");

	loadAllData();

	$("body").click(function(){
		console.log("a click");

		console.log(event.pageX);
		console.log(event.pageY);

		var top_ = event.pageY;
		var left_ = event.pageX;

		var text = prompt("Enter text here");

		if(text != null){		

			console.log(text);

			htmlStr = "<div style='top:"+top_+"px; left:"+left_+"px; '>"+text+"</div>";


			$("body").append(htmlStr);

			var obj_to_be_saved = {
				mainText: text,
				top: top_,
				left: left_
			}

			console.log(obj_to_be_saved);
			saveData(obj_to_be_saved);
		}
		else
			console.log("Nothing entered");

	});

	// setInterval( window.location.reload(), 50000);
});