var express = require("express");
var sqlite3 = require("sqlite3");
var bodyParser = require("body-parser");
var unirest = require("unirest");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getvideo", function(req,res) {
	var videoID = req.query.id;
	if (videoID == undefined || videoID == "") {
		return res.status(500).json({message: "Valid Vido ID Required"});
	}
	//Need to check if video is valid, use Youtube API "Videos: List"
	//https://developers.google.com/youtube/v3/docs/videos/list
	//https://developers.google.com/youtube/iframe_api_reference
	unirest.get("https://coolguruji-youtube-to-mp3-download-v1.p.mashape.com/?id=" + videoID)
	.header("X-Mashape-Key", "gcb4IAjrU2mshi3V4tiBuVkrn1fnp1KnuZmjsnJ1xMryf1fAHV")
	.header("Accept", "text/plain")
	.end(function (result) {
  var html = JSON.stringify(result.body.data.html);
	var link = JSON.stringify(result.body.data.link);
	});
})

var port = process.env.PORT || 8000;
app.listen(port, function() {
	console.log("Running server on port " + port);
});