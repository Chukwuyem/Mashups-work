var data_array;
var array_of_places = [];
var array_of_markers = [];
var testvar = [3, 5];
var newMarker;
var index_of_present_place;

function eachPlace(latitude, longitude, address) {
	this.latitude = latitude;
	this.longitude = longitude;
	this.mainAddress = address;
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
			data_array = data.rows;
			console.log(data.rows);

			for(var i=0; i< data.rows.length; i++){
				array_of_places[i] = new eachPlace( data.rows[i].doc.db_latitude, data.rows[i].doc.db_longitude, data.rows[i].doc.text_address);
			}

			console.log(array_of_places);

			initialize(0, 0);

		}
	});
}

function initialize(Lati, Lngi) {

		var myLatlng= new google.maps.LatLng(Lati, Lngi);
        var mapOptions = {
          center: myLatlng,
          zoom: 2,
          scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById("fav_map"),
            mapOptions);

        var styles = [
					  {
					    featureType: "landscape.natural",
					    stylers: [
					      { color: "#c0c0c0" }
					    ]
					  },{
					    featureType: "water",
					    stylers: [
					      { color: "#c8defe" },
					    ]
					  },{
					    featureType: "administrative.country"  }
					];

		map.setOptions({styles: styles});

		for(var i=0; i< array_of_places.length; i++){

			var fav_lat = array_of_places[i].latitude;
			var fav_long = array_of_places[i].longitude;

			var pinPos = new google.maps.LatLng(array_of_places[i].latitude, array_of_places[i].longitude);

			newMarker = new google.maps.Marker({
				position: pinPos,
				map: map,
				title: array_of_places[i].mainAddress
			});


			bindClick(array_of_places[i], newMarker);

		}

		console.log(array_of_places); 
}

function bindClick(thePlace, theMarker){
	google.maps.event.addListener(theMarker, 'click', function() {
		console.log(thePlace);
		searchGeocodes(thePlace.latitude, thePlace.longitude, thePlace.mainAddress);
		window.location.href = "#main";
	});
}


function searchGeocodes(Lat, Lng, divAdd) {

	var google_API_KEY = "AIzaSyD38gJAH4q-lJZ65ZiBbGkxRZ-XJQXE2SA";

	var ReverseGeocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + Lat + "," + Lng + "&key=" + google_API_KEY;
	console.log(ReverseGeocodeURL);

	$.ajax({
		url: ReverseGeocodeURL,
		type: 'GET',
		dataType: 'json',
		error: function(){
			console.log("Oh no! searchGeocodes didn't work...");
		},
		success: function(data){
			console.log("searchGeocodes function successfully deployed!");
			//prepare the doc for the info
			$("#main").css("height", "1430px");
			$("#main").css("display", "block");

			//also clear existing results in the news, map and pictures div
			$("#fav_place_weather").html('');
			$("#fav_place_pictures").html('');
			$("#fav_place_news").html('');
			$("#fav_place_map").html('');

			//change display of main from none to block

			if (data.status == "OK")
			{ 
				console.log(data.results);
				var Obj_list = data.results;

				var resultAddress = Obj_list[0].formatted_address;

				$('#fav_place_theAddress').html('');
				$('#fav_place_theAddress').prepend(divAdd);
				$('#like').html('');
				var likeStr = 'Like ' + divAdd + '? Well favourite it.' 
				$('#like').append(likeStr);

				initialize_single(Lat, Lng);
				weather(Lat, Lng);

				//calling collectNews function
				var r_index; //index in list who's formatted address property will be used to as collectNews' searchterm
				if(Obj_list.length > 10)
					{r_index = Obj_list.length - 3; }
				else if(Obj_list.length % 2 == 0)
					{r_index = Obj_list.length/2; }
				else if (Obj_list.length % 2 != 0)
					{r_index = (Obj_list.length/2) - 0.5;}
				console.log(r_index);
				var compound_term = Obj_list[r_index].formatted_address;
				var term = compound_term.split(',')[0];
				console.log("The search term is...");
				console.log(term);
				collectNews(term);

				//calling panoramio function
				panoramio_img(Lat, Lng, resultAddress);


			}
			else
			{
				var theAddress = "There was an error in reading the information associated with you geocodes."
				$('#fav_place_theAddress').html('');
				$('#fav_place_theAddress').prepend('<h4 style="color:red;">' + theAddress + '</h4>');
				
			}	
			
		}
	});

}

function initialize_single(Lati, Lngi) {
		var myLatlng= new google.maps.LatLng(Lati, Lngi);
        var mapOptions = {
          center: myLatlng,
          zoom: 13,
          scrollwheel: false  //so, when people scroll, that second map doesn't annoyingly starting zooming in
        };

        var map = new google.maps.Map(document.getElementById("fav_place_map"),
            mapOptions);

        var marker = new google.maps.Marker({
      	position: myLatlng,
     	 map: map,
      	title: 'Pin'
  		});

 
}

function weather(Lati_, Longi_){
	var OpenWeatherAPI_KEY = "7da73f93c6e0a38c659556f4cb59b5c3";

	var OpenWeatherURL= "//api.openweathermap.org/data/2.5/weather?lat="+Lati_+"&lon="+Longi_+"&APPID="+OpenWeatherAPI_KEY;
	console.log(OpenWeatherURL);

	
	$.ajax({
		url: OpenWeatherURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(){
			console.log("openweathermap not working...");
		},
		success: function(data){
			console.log("OpenWeatherMap successfully deployed!");

			console.log(data);

			console.log(data.weather[0].icon);
			var wthr_icon = data.weather[0].icon;
			var wthr_meteo_img;
			if (wthr_icon == "01d") { wthr_meteo_img = "svg_icons/2.svg";}
			else if(wthr_icon =="01n") { wthr_meteo_img = "svg_icons/3.svg";}
			else if(wthr_icon == "02d") { wthr_meteo_img = "svg_icons/8.svg";}
			else if(wthr_icon == "02n") { wthr_meteo_img = "svg_icons/9.svg";}
			else if(wthr_icon == "03d") { wthr_meteo_img = "svg_icons/14.svg";}
			else if(wthr_icon == "03n") { wthr_meteo_img = "svg_icons/14.svg";}
			else if(wthr_icon == "04d") { wthr_meteo_img = "svg_icons/25.svg";}
			else if(wthr_icon == "04n") { wthr_meteo_img = "svg_icons/25.svg";}
			else if(wthr_icon == "09d") { wthr_meteo_img = "svg_icons/17.svg";}
			else if(wthr_icon == "09n") { wthr_meteo_img = "svg_icons/17.svg";}
			else if(wthr_icon == "10d") { wthr_meteo_img = "svg_icons/18.svg";}
			else if(wthr_icon == "10n") { wthr_meteo_img = "svg_icons/18.svg";}
			else if(wthr_icon == "11d") { wthr_meteo_img = "svg_icons/27.svg";}
			else if(wthr_icon == "11n") { wthr_meteo_img = "svg_icons/27.svg";}
			else if(wthr_icon == "13d") 
			{ 
				if(data.weather[0].id == (600 - 0.0) || data.weather[0].id == (620 - 0.0) || data.weather[0].id == (615 - 0.0))
				{wthr_meteo_img = "svg_icons/21.svg";}
				else
				{wthr_meteo_img = "svg_icons/23.svg";}
			}
			else if(wthr_icon == "13n") { wthr_meteo_img = "svg_icons/23.svg";}
			else if(wthr_icon == "50d") 
			{ 
				if(data.weather[0].id == (701 - 0.0)) 
				{wthr_meteo_img = "svg_icons/5.svg";}
				else
				{wthr_meteo_img = "svg_icons/6.svg";}
			}
			else if(wthr_icon == "50n") {wthr_meteo_img = "svg_icons/13.svg";}
			else {wthr_meteo_img = "svg_icons/45.svg";}

			$("#fav_place_weather").html('');
			var weatherStr= "<p>The weather for " + data.name + "</p>";
			weatherStr += "<object type='image/svg+xml' data=" + wthr_meteo_img + ">Your browser doesn't support svg</object>";
			weatherStr += "<p>" + data.weather[0].description + "</p>";
			weatherStr += "<p>Temperatures ranging from " + (data.main.temp_min - 273.15).toFixed(2) + " to " + (data.main.temp_max - 273.15).toFixed(2) + ". (Celsius)</p>";
			$("#fav_place_weather").prepend(weatherStr);


			//$("object").css("margin-left", ( ( parseInt(($("#fav_place_weather").css("width")).slice(0, -2)) - parseInt(($("object").css("width")).slice(0, -2)) )/2 ).toString() + "px" );
			
		}
	});
}


function panoramio_img(LAT, LONG, place){
	console.log("starting panoramio function");
	//min longitude
	var MinX = LONG - 1.5;
	//min latitude
	var MinY = LAT - 3;
	//max longitude
	var MaxX = (LONG - 0.0) + 1.5; //because all inputs are strings... hence if long= 23, long + 3 = 233 not 26.
	//max latitude
	var MaxY = (LAT - 0.0) + 1.5;
	var panoramioURL = "//www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=5&minx="+ MinX +"&miny="+ MinY +"&maxx="+ MaxX +"&maxy="+ MaxY+ "&size=medium&mapfilter=true";
	//console.log(panoramioURL);
	$.ajax({
		url: panoramioURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(){
			console.log("panoramio not working..,");
		},
		success: function(data){
			console.log("PANORAMIO WORKS!!!");
			console.log(panoramioURL);
			console.log(data);
			console.log(data.photos);

			var htmlPhotos = "";
			var topic_string = "<h3>Photos from around " + place + "</h3>";
			htmlPhotos += topic_string;
			var i= 0;
			for(i=0; i<data.photos.length; i++)
			{
				var eachPhoto = data.photos[i];

				htmlPhotos += '<div class="photo_container">';
				htmlPhotos += '<p>' + data.photos[i].photo_title + '</p>';
				htmlPhotos += '<img src=' + data.photos[i].photo_file_url + ' />';
				htmlPhotos += '<p><a href='+ data.photos[i].photo_url + ' target="_blank" >View in Panoramio</a></p>';
				htmlPhotos += '</div>';
			}

			$("#fav_place_pictures").html("");
			$("#fav_place_pictures").append(htmlPhotos);

		}
	});
}

function collectNews(search) {
	var API_KEY = "8a8qagdgt6vesmwyrxn89wfr";

	var guardianURL = "//content.guardianapis.com/search?api-key=" + API_KEY +"&show-fields=all&show-elements=all&q=" + search;
	var guardianURL2 ="//content.guardianapis.com/search?api-key=" + API_KEY + "&show-fields=all&show-elements=all&page-size=5&order-by=newest&q=" + search;

	$.ajax({
		url: guardianURL2,
		type: 'GET',
		dataType: 'jsonp',
		error: function(){
			console.log("Oh no!!! Didn't work...");
		},
		success: function(data){
			console.log("collectNews successfully deployed!");
			console.log(data);
			console.log(data.response.results);


			var htmlString = "";
			var topic_string = "<h3>News from around " + search + "</h3>";
			htmlString += topic_string;
			var i= 0;
			for(i=0; i< data.response.results.length; i++)
			{
				var eachNewsObj = data.response.results[i];

				htmlString += '<div class="container">';
				htmlString += '<p>' + eachNewsObj.fields.headline + '</p>';
				if (eachNewsObj.fields.thumbnail == undefined || eachNewsObj.fields.thumbnail == "undefined")
				{
					htmlString += '<img src="news.png" />';
				}
				else
				{
					htmlString +=  '<img src=' + eachNewsObj.fields.thumbnail + ' />';
				}
				htmlString += '<p>' + eachNewsObj.fields.trailText + '</p>';
				htmlString += '<a href=' + eachNewsObj.webUrl + ' target="_blank" >Read More</a>';
				htmlString += '</div>';
			}
			$("#fav_place_news").html("");
			$("#fav_place_news").append(htmlString);
			
		}
	});
}


$(document).ready(function(){
	console.log("We are ready!");

	document.getElementById("footer").style.position = "relative";

	loadAllData();

});