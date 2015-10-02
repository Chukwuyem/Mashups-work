var pictures_exist = false;
var news_exist = false;
var map_exist = false;
var already_saved = false;

var info_to_be_saved; 
/*an object with the city, lat and long. for every good
search, it is defined, whther search button is pressed or not.
when search button is pressed, it is retrieved and submitted
*/

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

			$("#weather").html('');
			var weatherStr= "<p>The weather for " + data.name + "</p>";
			weatherStr += "<object type='image/svg+xml' data=" + wthr_meteo_img + ">Your browser doesn't support svg</object>";
			weatherStr += "<p>" + data.weather[0].description + "</p>";
			weatherStr += "<p>Temperatures ranging from " + (data.main.temp_min - 273.15).toFixed(2) + " to " + (data.main.temp_max - 273.15).toFixed(2) + ". (Celsius)</p>";
			$("#weather").prepend(weatherStr);
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

			$("#pictures").html("");
			$("#pictures").append(htmlPhotos);

			background_panoramio(LAT, LONG);

		}
	});
}

function background_panoramio(LAT, LONG){
	console.log("starting panoramio function");
	//min longitude
	var MinX = LONG - 1;
	//min latitude
	var MinY = LAT - 1;
	//max longitude
	var MaxX = (LONG - 0.0) + 1; //because all inputs are strings... hence if long= 23, long + 3 = 233 not 26.
	//max latitude
	var MaxY = (LAT - 0.0) + 1;
	var panoramioURL = "//www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=5&minx="+ MinX +"&miny="+ MinY +"&maxx="+ MaxX +"&maxy="+ MaxY+ "&size=original&mapfilter=true";
	//console.log(panoramioURL);
	$.ajax({
		url: panoramioURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(){
			console.log("background_panoramio not working..,");
		},
		success: function(data){
			console.log("Background PANORAMIO is operational!!!");
			console.log(panoramioURL);
			console.log(data);
			console.log(data.photos);

			$("body").css("background", "url("+data.photos[0].photo_file_url+") fixed center");
			$("body").css("background-size", "cover");	
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
			$("#news").html("");
			$("#news").append(htmlString);
			
		}
	});
}




function initialize(Lati, Lngi) {
		var myLatlng= new google.maps.LatLng(Lati, Lngi);
        var mapOptions = {
          center: myLatlng,
          zoom: 10
        };

        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        var marker = new google.maps.Marker({
      	position: myLatlng,
     	 map: map,
      	title: 'Pin'
  		});

 
}


function searchGeocodes(Lat, Lng) {

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
			$("body").css("height", "86em");
			$("#main").css("display", "block");
			$("#footer").css("position", "relative");
			$("#search_box").slideToggle();

			//also clear existing results in the news, map and pictures div
			$("#weather").html('');
			$("#pictures").html('');
			$("#news").html('');
			$("#map").html('');

			//change display of main from none to block

			if (data.status == "OK")
			{ 
				console.log(data.results);
				var Obj_list = data.results;

				var resultAddress = Obj_list[0].formatted_address;

				$('#theAddress').html('');
				$('#theAddress').prepend(resultAddress);

				initialize(Lat, Lng);
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
				$('#FavButton').css("display", "inline-block");

				info_to_be_saved = {
					text_address: resultAddress,
					db_latitude: Lat,
					db_longitude: Lng
				};
			}
			else
			{
				$('#FavButton').css("display", "none");
				var theAddress = "There was an error in reading the information associated with you geocodes."
				$('#theAddress').html('');
				$('#theAddress').prepend('<h4 style="color:red;">' + theAddress + '</h4>');
				
			}	
			
		}
	});

}

function searchPlace(place_name) {
	var google_API_KEY = "AIzaSyD38gJAH4q-lJZ65ZiBbGkxRZ-XJQXE2SA";

	var GeocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+place_name+"&key=" + google_API_KEY; 

	$.ajax({
		url: GeocodeURL,
		type: 'GET',
		dataType: 'json',
		error: function(){
			console.log("Oh no!!! Didn't work...");
		},
		success: function(data){
			console.log("searchPlace successfully deployed!");
			$("body").css("height", "86em");
			$("#main").css("display", "block");
			$("#footer").css("position", "relative");
			$("#search_box").slideToggle();

			//also clear existing results in the news, map and pictures div
			$("#weather").html('');
			$("#pictures").html('');
			$("#news").html('');
			$("#map").html('');

			console.log(data);

			if (data.status == "OK")
			{
				var theAddress= '';
				var itsLatitude = data.results[0].geometry.location.lat;
				var itsLongitude = data.results[0].geometry.location.lng;
				theAddress += "Latitude: ";
				theAddress += itsLatitude;
				theAddress += ", ";
				theAddress += "Longitude: ";
				theAddress += itsLongitude;
				theAddress += ".";
				theAddress += " (";
				theAddress += data.results[0].formatted_address;
				theAddress += ")";

				$('#theAddress').html('');
				$('#theAddress').prepend(theAddress);

				initialize(itsLatitude, itsLongitude);
				weather(itsLatitude, itsLongitude);

				//formatting to obtain search term for collectNews
				var searchterm = data.results[0].formatted_address.split(',')[0];
				console.log("collectNews search term is " + searchterm);
				collectNews(searchterm);

				panoramio_img(itsLatitude, itsLongitude, data.results[0].formatted_address);
				$('#FavButton').css("display", "inline-block");

				info_to_be_saved = {
					text_address: data.results[0].formatted_address,
					db_latitude: itsLatitude,
					db_longitude: itsLongitude
				};

			}
			else if(data.status == "ZERO_RESULTS")
			{
				$('#FavButton').css("display", "none");
				var theAddress = "It seems the address you entered doesn't exist on earth. Our sincerest apologies. Watch this space for Hanno for Mars, Venus and Pluto."
				$('#theAddress').html('');
				$('#theAddress').prepend('<h4 style="color:red;">' + theAddress + '</h4>');
			}
		}
	}); 
}

function saveData(obj){
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
			$('#status_of_save').html('');
			$('#status_of_save').append('Unable to Add to Favourites. Try a Refresh.');
		},
		success: function(resp){
			console.log('Data successfully uploaded to database!');
			console.log(resp);
			$('#status_of_save').html('');
			$('#status_of_save').append('Successfully Added to Favourites.');
		}
	});
}


$(document).ready(function(){
	console.log("We are ready!");

	//button listener
	$("#search_disp").click(function(){
		$("#search_box").slideToggle();
	});

	$('#theGeoButton').click(function(){
		console.log("Clicked the Lat-Long Button");
		var Latitude = $('#Latitude').val();
		var Longitude = $('#Longitude').val();
		if (typeof(Latitude * 1.0) != "number"){ alert("Latitude value is not a number!");}
		else if(typeof(Longitude * 1.0) != "number") { alert("Longitude value is not a number!"); }
		else if(Latitude < -90 || Latitude > 90) { alert("Latitude value is invalid!"); }
		else if(Longitude < -180 || Longitude > 180) { alert("Longitude value is invalid!"); }
		//function to make lat-long API request
		else{ already_saved = false; $('#status_of_save').html(''); $('#status_of_save').append('Adding place to favourites...'); searchGeocodes(Latitude, Longitude); }	
	});

	$('#theTextButton').click(function(){
		console.log("Clicked the Text Button");
		var place_to_be_searched = $('#PlaceName').val();
		already_saved = false;
		$('#status_of_save').html('');
		$('#status_of_save').append('Adding place to favourites...');
		searchPlace(place_to_be_searched);
	});

	$('#PlaceName').keypress(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13){
			var place_to_be_searched = $('#PlaceName').val();
			already_saved = false;
			$('#status_of_save').html('');
			$('#status_of_save').append('Adding place to favourites...');
			searchPlace(place_to_be_searched);
		}
	});

	$('#FavButton').on('click', function(event){
		console.log('about to save some info!!!');
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
		if(already_saved == false){
			already_saved = true;
			saveData(info_to_be_saved);	
		}
		else{
			$('#status_of_save').html('');
			$('#status_of_save').append('Already Added to Favourites.');
		}	
	});

	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });

});