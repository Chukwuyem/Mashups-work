
var express = require("express");
var logger = require('morgan');
var Request = require("request");
var bodyParser = require('body-parser');
var couchdb = require("couchdb-api");

var app = express();


app.set("views", __dirname + "/home");//views is a keyword
console.log(__dirname + "/home");

app.engine(".html", require('ejs').__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());

/******DATABASE CONFIG************/

var cloudant_USER = 'chuksy';
var cloudant_DB = 'tobirama_senju';
var cloudant_KEY = 'otionctseduallsoclooksho';
var cloudant_PASSWORD = 'YHbDNcy28OnivALFTNuTFuPV';
var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB;


//couchdb-api shit
var server = couchdb.srv("https://" + cloudant_USER + ".cloudant.com/");
var db = server.db(cloudant_DB);


/********ROUTES**************/

app.get("/", function(req, res){
	res.render('index');
});

//SAVE an object to the db
app.post("/save", function(req,res){
	console.log("A POST!!!!");
	//Get the data from the body
	var data = req.body;
	console.log(data);
	//Send the data to the db
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: data
	},
	function (error, response, body){
		console.log("This is response");
		console.log(response);

		if (response.statusCode == 201){
			console.log("Saved!");
			res.json(body);
		}
		else{
			console.log("Uh oh...");
			console.log("Error: " + res.statusCode);
			res.send("Something went wrong...");
		}
	});
});

// app.delete("/delete", function(req, res){
// 	console.log("deleting a document");

// 	Request.delete({
// 		url: cloudant_URL+"/"+doc_ID,
// 		auth: {
// 			user: cloudant_KEY,
// 			pass: cloudant_PASSWORD
// 		},
// 		json: true
// 	},
// 	function(error, response, body){
// 		console.log(body);

// 	});
// });

// function deldoc(array_of_docs){
// 	console.log("starting the deleting...");
// 	for(var i=0; i< array_of_docs.length; i++){
// 		if(array_of_docs[i].doc.mainText == "W"){
// 			console.log("deleting...!!");
// 			var doc = db.doc(array_of_docs[i].id);
// 			doc.get(function(err, body){
// 				doc.del(function(err, response){
// 					console.log(response);
// 				});
// 			});
// 		}
// 	}
// }

//DELETE an object from the database
app.post("/delete", function(req,res){
	console.log("Deleting an object");
	var theObj = req.body;
	//The URL must include the obj ID and the obj REV values
	var theURL = cloudant_URL + '/' + theObj._id + '?rev=' + theObj._rev;
	//Need to make a DELETE Request
	Request.del({
		url: theURL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		console.log(body);
		res.json(body);
	});
});

//JSON Serving route - ALL Data
app.get("/api/all", function(req,res){
	console.log('Making a db request for all entries');
	//Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: cloudant_URL+"/_all_docs?include_docs=true",
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		var theRows = body.rows;
		//Send the data
		res.json(theRows);
	});
});

app.get("*", function(req, res){
	res.redirect('/');
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port '+ port);