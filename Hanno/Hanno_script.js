var pictures_exist = false;
var news_exist = false;

function weather(Lati_, Longi_){
	var OpenWeatherAPI_KEY = "7da73f93c6e0a38c659556f4cb59b5c3";

	var OpenWeatherURL= "http://api.openweathermap.org/data/2.5/weather?lat="+Lati_+"&lon="+Longi_+"&APPID="+OpenWeatherAPI_KEY;
	console.log(OpenWeatherURL);

	// var OpenWeatherURL_fake = "http://api.openweathermap.org/data/2.5/weather?lat=34.151984&lon=-118.638318&APPID=7da73f93c6e0a38c659556f4cb59b5c3";

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

			$("#theWeather").html('');
			var weatherStr= "<h3>The weather for " + data.name + "</h3>";
			weatherStr += "<h4>" + data.weather[0].description + "</h4>";
			weatherStr += "<h4>Temperatures ranging from " + (data.main.temp_min - 273.15).toFixed(2) + " to " + (data.main.temp_max - 273.15).toFixed(2) + ". (Celsius)</h4>";
			weatherStr += "<object type='image/svg+xml' data=" + wthr_meteo_img + ">Your browser doesn't support svg</object>";
			$("#theWeather").append(weatherStr);
		}
	});
}


function panoramio_img(LAT, LONG, place){
	console.log("starting panoramio function");
	//min longitude
	var MinX = LONG - 3;
	//min latitude
	var MinY = LAT - 3;
	//max longitude
	var MaxX = (LONG - 0.0) + 3; //because all inputs are strings... hence if long= 23, long + 3 = 233 not 26.
	//max latitude
	var MaxY = (LAT - 0.0) + 3;
	var panoramioURL = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=5&minx="+ MinX +"&miny="+ MinY +"&maxx="+ MaxX +"&maxy="+ MaxY+ "&size=medium&mapfilter=true";
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

			console.log(data);
			console.log(data.photos);

			var htmlPhotos = "";
			if(pictures_exist == false) //if div pictures doesn't exist already
			{
				pictures_exist = true;
				htmlPhotos += '<div id="pictures">';
				var topic_string = "<h3>Photos from around " + place + "</h3>";
				htmlPhotos += topic_string;
				var i= 0;
				for(i=0; i<data.photos.length; i++)
				{
					var eachPhoto = data.photos[i];

					htmlPhotos += '<div class="photo_container">';
					htmlPhotos += '<h4>' + data.photos[i].photo_title + '</h4>';
					htmlPhotos += '<img src=' + data.photos[i].photo_file_url + ' class="hover-shadow" />';
					htmlPhotos += '<p><a href='+ data.photos[i].photo_url + ' target="_blank" >View in Panoramio</a></p>';
					htmlPhotos += '</div>';
				}

				htmlPhotos += '</div>';


				$("#body").append(htmlPhotos);
			}
			else
			{
				var topic_string = "<h3>Photos from around " + place + "</h3>";
				htmlPhotos += topic_string;
				var i= 0;
				for(i=0; i<data.photos.length; i++)
				{
					var eachPhoto = data.photos[i];

					htmlPhotos += '<div class="photo_container">';
					htmlPhotos += '<h4>' + data.photos[i].photo_title + '</h4>';
					htmlPhotos += '<img src=' + data.photos[i].photo_file_url + ' class="hover-shadow" />';
					htmlPhotos += '<p><a href='+ data.photos[i].photo_url + ' target="_blank" >View in Panoramio</a></p>';
					htmlPhotos += '</div>';
				}


				$("#pictures").html("");
				$("#pictures").append(htmlPhotos);
			}

			// var htmlPhotos = "";
			// htmlPhotos += '<div id="pictures">';
			// var topic_string = "<h3>Photos from around " + place + "</h3>";
			// htmlPhotos += topic_string;
			// var i= 0;
			// for(i=0; i<data.photos.length; i++)
			// {
			// 	var eachPhoto = data.photos[i];

			// 	htmlPhotos += '<div class="photo_container">';
			// 	htmlPhotos += '<h4>' + data.photos[i].photo_title + '</h4>';
			// 	htmlPhotos += '<img src=' + data.photos[i].photo_file_url + ' class="hover-shadow" />';
			// 	htmlPhotos += '<p><a href='+ data.photos[i].photo_url + ' target="_blank" >View in Panoramio</a></p>';
			// 	htmlPhotos += '</div>';
			// }

			// htmlPhotos += '</div>';

			// $("#body").append(htmlPhotos);

		}
	});
}


function collectNews(search) {
	var API_KEY = "8a8qagdgt6vesmwyrxn89wfr";

	var guardianURL = "http://content.guardianapis.com/search?api-key=" + API_KEY +"&show-fields=all&show-elements=all&q=" + search;
	var guardianURL2 ="http://content.guardianapis.com/search?api-key=" + API_KEY + "&show-fields=all&show-elements=all&page-size=5&order-by=newest&q=" + search;

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
			if(news_exist == false) //if div news doesn't exist yet
			{
				news_exist = true;
				htmlString += '<div id="news">';
				var topic_string = "<h3>News from around " + search + "</h3>";
				htmlString += topic_string;
				var i= 0;
				for(i=0; i< data.response.results.length; i++)
				{
					var eachNewsObj = data.response.results[i];

					htmlString += '<div class="container">';
					htmlString += '<h3>' + eachNewsObj.fields.headline + '</h3>';
					if (eachNewsObj.fields.thumbnail == undefined || eachNewsObj.fields.thumbnail == "undefined")
					{
						htmlString += '<img src=' + eachNewsObj.fields.thumbnail + ' />';
					}
					else
					{
						htmlString += '<img src="news.png" />';
					}
					htmlString += '<p>' + eachNewsObj.fields.trailText + '</p>';
					htmlString += '<a href=' + eachNewsObj.webUrl + ' target="_blank" >Read More</a>';
					htmlString += '</div>';
				}

				htmlString += '</div>';

				$("#body").append(htmlString);
			}
			else 
			{
				var topic_string = "<h3>News from around " + search + "</h3>";
				htmlString += topic_string;
				var i= 0;
				for(i=0; i< data.response.results.length; i++)
				{
					var eachNewsObj = data.response.results[i];

					htmlString += '<div class="container">';
					htmlString += '<h3>' + eachNewsObj.fields.headline + '</h3>';
					htmlString += '<img src=' + eachNewsObj.fields.thumbnail + ' />';
					htmlString += '<p>' + eachNewsObj.fields.trailText + '</p>';
					htmlString += '<a href=' + eachNewsObj.webUrl + ' target="_blank" >Read More</a>';
					htmlString += '</div>';
				}

				$("#news").html("");
				$("#news").append(htmlString);
			}

			
			// var htmlString = "";
			// htmlString += '<div id="news">';
			// var topic_string = "<h3>News from around " + search + "</h3>";
			// htmlString += topic_string;
			// var i= 0;
			// for(i=0; i< data.response.results.length; i++)
			// {
			// 	var eachNewsObj = data.response.results[i];

			// 	htmlString += '<div class="container">';
			// 	htmlString += '<h3>' + eachNewsObj.fields.headline + '</h3>';
			// 	htmlString += '<img src=' + eachNewsObj.fields.thumbnail + ' />';
			// 	htmlString += '<p>' + eachNewsObj.fields.trailText + '</p>';
			// 	htmlString += '<a href=' + eachNewsObj.webUrl + ' target="_blank" >Read More</a>';
			// 	htmlString += '</div>';
			// }

			// htmlString += '</div>';

			// $("#body").append(htmlString);
			
		}
	})
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

			if (data.status == "OK")
			{ 
				console.log(data.results);
				var Obj_list = data.results;

				//printing each formatted address
				// for (var i = 0; i < Obj_list.length; i++)
				// {
				// 	console.log(Obj_list[i].formatted_address);
				// }

				var theAddress = Obj_list[0].formatted_address;

				$('#address').html('');
				$('#address').prepend('<h4>' + theAddress + '</h4>');

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
				panoramio_img(Lat, Lng, theAddress);
			}
			else
			{
				var theAddress = "There was an error in reading the information associated with you geocodes."
				$('#address').html('');
				$('#address').prepend('<h4 style="color:red;">' + theAddress + '</h4>');
				
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
				theAddress += "(";
				theAddress += data.results[0].formatted_address;
				theAddress += ")";

				$('#address').html('');
				$('#address').prepend('<h4>' + theAddress + '</h4>');

				initialize(itsLatitude, itsLongitude);
				weather(itsLatitude, itsLongitude);

				//formatting to obtain search term for collectNews
				var searchterm = data.results[0].formatted_address.split(',')[0];
				console.log("collectNews search term is " + searchterm);
				collectNews(searchterm);

				panoramio_img(itsLatitude, itsLongitude, data.results[0].formatted_address);

			}
			else if(data.status == "ZERO_RESULTS")
			{
				var theAddress = "It seems the address you entered doesn't exist on earth. Our sincerest apologies. Watch this space for Hanno for Mars, Venus and Pluto."
				$('#address').html('');
				$('#address').prepend('<h4 style="color:red;">' + theAddress + '</h4>');
			}
		}
	}); 
}

$(document).ready(function(){
	console.log("We are ready!");

	//button listener
	$('#theGeoButton').click(function(){
		console.log("Clicked the Lat-Long Button");
		var Latitude = $('#Latitude').val();
		var Longitude = $('#Longitude').val();
		if (typeof(Latitude * 1.0) != "number"){ alert("Latitude value is not a number!");}
		else if(typeof(Longitude * 1.0) != "number") { alert("Longitude value is not a number!"); }
		else if(Latitude < -90 || Latitude > 90) { alert("Latitude value is invalid!"); }
		else if(Longitude < -180 || Longitude > 180) { alert("Longitude value is invalid!"); }
		//function to make lat-long API request
		else{ searchGeocodes(Latitude, Longitude); }	
	});

	$('#theTextButton').click(function(){
		console.log("Clicked the Text Button");
		var place_to_be_searched = $('#PlaceName').val();
		searchPlace(place_to_be_searched);
	});

});

console.log("Not ready");