// var express = require("express");
// var sqlite3 = require("sqlite3");
// var bodyParser = require("body-parser");
// var unirest = require("unirest");
//
// var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// app.get("/getvideo", function(req,res) {
// 	var videoID = req.query.id;
// 	if (videoID == undefined || videoID == "") {
// 		return res.status(500).json({message: "Valid Vido ID Required"});
// 	}
// 	//Need to check if video is valid, use Youtube API "Videos: List"
// 	//https://developers.google.com/youtube/v3/docs/videos/list
// 	//https://developers.google.com/youtube/iframe_api_reference
// 	unirest.get("https://coolguruji-youtube-to-mp3-download-v1.p.mashape.com/?id=" + videoID)
// 	.header("X-Mashape-Key", "gcb4IAjrU2mshi3V4tiBuVkrn1fnp1KnuZmjsnJ1xMryf1fAHV")
// 	.header("Accept", "text/plain")
// 	.end(function (result) {
//   var html = JSON.stringify(result.body.data.html);
// 	var link = JSON.stringify(result.body.data.link);
// 	});
// })
//
// var port = process.env.PORT || 8000;
// app.listen(port, function() {
// 	console.log("Running server on port " + port);
// });

( function( window )

{
  'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
