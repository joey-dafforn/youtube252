var express = require("express");
var sqlite3 = require("sqlite3");
var bodyParser = require("body-parser");
var unirest = require("unirest");

var app = express();
var db = new sqlite3.Database('./Jeopardy(4).db');

app.use( bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.get("/getvideo", function(req,res) {
	var videoID = req.query.id;
	if (videoID == undefined || videoID == "") {
		return res.status(500).json({message: "Valid Vido ID Required"});
	}
	unirest.get("https://coolguruji-youtube-to-mp3-download-v1.p.mashape.com/?id=" + videoID)
	.header("X-Mashape-Key", "gcb4IAjrU2mshi3V4tiBuVkrn1fnp1KnuZmjsnJ1xMryf1fAHV")
	.header("Accept", "text/plain")
	.end(function (result) {
  var html = JSON.stringify(result.body.data.html);
	var link = JSON.stringify(result.body.data.link);
	console.log("html: " + html);
	console.log("link: " + link);
	});
})

/*
app.post('/auth/signin', function(req, res) {
	var userID = req.body.userID;
	var password = req.body.password;
	var uuid = guid();
	function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  } //End of guid
	if(userID == null || password == null) {
		return res.status(401).json({message: "invalid_credentials"});
	}
	var dbQuery = "select * from Users where UserID = ? and UserPassword = ?";
	var requestParams = [userID, password];

	db.get(dbQuery, requestParams, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(500).json({message: "Internal server error"});
		}
		if(user == null) {
			return res.status(401).json({message: "invalid_credentials"});
		}
		var date = new Date();
    var anotherquery = "UPDATE Users SET AuthToken = '" + uuid + "', AuthTokenIssued = '" + date + "' WHERE UserID = '" + userID + "'";
		return res.status(200).json({message: "success", authToken: uuid});
	});
});

app.get('/questions', function(req, res) {
	var categoryTitle = req.query.categoryTitle;
	var dollarValue = req.query.dollarValue;
	var questionText = req.query.questionText;
	var answerText = req.query.answerText;
	var showNumber = req.query.showNumber;
	var airDate = req.query.airDate;
	var isValidToken = req.query.token;
	var tokenIsUsed = 0;
	if (isValidToken == "" || isValidToken == undefined) {
		return res.status(400).json({message: "unauthorized access"});
	}
	var userQuery = "select * from Users";
	db.all(userQuery, [], function(err, user) {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		user.forEach((row) => {
			if (row.AuthToken == isValidToken) {
				tokenIsUsed = 1
				var dateComp = new Date();
				var asdf = new Date(row.AuthTokenIssued);
				if (asdf.getHours() > dateComp.getHours() + 1) {
					return res.status(400).json({message: "auth token expired"});
				}
			}
		});
		if (tokenIsUsed == 0) {
			return res.status(400).json({message: "unauthorized access"});
		}
	});

	var dbQuery = "select * from Questions join Categories on Questions.CategoryCode = Categories.CategoryCode where ";
	var paramCount = 0;
	var params = [];

	if (categoryTitle != null) {

		if(paramCount > 0) {
			dbQuery = dbQuery + 'and ';
		}

		paramCount++;
		dbQuery = dbQuery + 'CategoryTitle = ? ';
		params.push(categoryTitle.toUpperCase());
	}

	if (dollarValue != null) {

		if(paramCount > 0) {
			dbQuery = dbQuery + 'and ';
		}

		paramCount++;
		dbQuery = dbQuery + 'DollarValue = ? ';
		dollarValue = "$" + dollarValue;
		params.push(dollarValue);
	}

	if (questionText) {

		if(paramCount > 0) {
			dbQuery = dbQuery + 'and ';
		}

		paramCount++;
		dbQuery = dbQuery + 'QuestionText like ? ' ;
		questionText = '%' + questionText + '%';
		params.push(questionText);
	}

	if (answerText) {

		if(paramCount > 0) {
			dbQuery = dbQuery + 'and ';
		}

		paramCount++;
		dbQuery = dbQuery + 'AnswerText = ? ';
		params.push(answerText);
	}

	if (showNumber) {

		if(paramCount > 0) {
			dbQuery = dbQuery + 'and ';
		}

		paramCount++;
		dbQuery = dbQuery + 'ShowNumber = ? ';
		params.push(showNumber);
	}

	if (airDate) {

		if(paramCount > 0) {
			dbQuery = dbQuery + 'and ';
		}

		paramCount++;
		dbQuery = dbQuery + 'AirDate = ? ';
		params.push(airDate);
	}

	dbQuery = dbQuery + 'order by AirDate desc';

	if(paramCount == 0) {
		dbQuery = "select * from Questions order by AirDate desc";
	}

	db.all(dbQuery, params, (err, questions) => {

		if(questions.length > 5000) {
			return res.status(400).json({message: "too_many_results"});
		}

		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}

		return res.status(200).json(questions);
	});
});

app.post('/questionadd', function(req, res) {
	var categoryTitle = req.body.categoryTitle;
	var dollarValue = req.body.dollarValue;
	var questionText = req.body.questionText;
	var answerText = req.body.answerText;
	var showNumber = req.body.showNumber;
	var airDate = req.body.airDate;
	var categoryCode = req.body.categoryCode;
	var isValidToken = req.query.token;
	var tokenIsUsed = 0;
	if (isValidToken == "" || isValidToken == undefined) {
		return res.status(400).json({message: "unauthorized access"});
	}
	var userQuery = "select * from Users";
	db.all(userQuery, [], function(err, user) {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		user.forEach((row) => {
			if (row.AuthToken == isValidToken) {
				tokenIsUsed = 1
				var dateComp = new Date();
				var asdf = new Date(row.AuthTokenIssued);
				if (asdf.getHours() > dateComp.getHours() + 1) {
					return res.status(400).json({message: "auth token expired"});
				}
			}
		});
		if (tokenIsUsed == 0) {
			return res.status(400).json({message: "unauthorized access"});
		}
	});

	if (airDate == undefined || airDate == "") {
		return res.status(400).json({message: "Air date cannot be empty"});
	}
	if (parseInt(showNumber) <= 0) {
		return res.status(400).json({message: "Show number must be a valid integer greater than 0"});
	}
	if (parseInt(dollarValue) > 2000 || parseInt(dollarValue) < 100 || parseInt(dollarValue) % 100 != 0) {
		return res.status(400).json({message: "Dollar value must be > 100 and < 2000 and divisible by 100"});
	}
	if (questionText == "" || questionText == undefined ) {
		return res.status(400).json({message: "Question text cannot be empty"});
	}
	if (answerText == "" || answerText == undefined) {
		return res.status(400).json({message: "Answer text cannot be empty"});
	}
	if (categoryCode == "" || categoryCode == undefined) {
		return res.status(400).json({message: "Category code cannot be empty"});
	}
	if (categoryTitle == "" || categoryTitle == undefined) {
		return res.status(400).json({message: "Category title cannot be empty"});
	}
	var categoryQuery = "select * from Categories";
	db.all(categoryQuery, [], function(err, category) {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		category.forEach((row) => {
		if (row.CategoryCode == categoryCode && row.CategoryTitle == categoryTitle) {
			//Do nothing if both code and title match
		}
		else if (row.CategoryCode == categoryCode && row.CategoryTitle != categoryTitle) {
			return res.status(400).json({message: "Invalid Category Title"});
		}
		else if (row.CategoryCode != categoryCode && row.CategoryTitle == categoryTitle) {
			return res.status(400).json({message: "Invalid Category Code"});
		}
		else {
			var addCategoryQuery = "INSERT INTO Categories (CategoryCode, CategoryTitle) VALUES (" + categoryCode + ", '" + categoryTitle + "');";
			db.all(addCategoryQuery, [], function(err, categoryQuestion) {
				if (err) {
					return res.status(500).json({message: "Internal server error"});
				}
				else {
					return res.status(200).json({message: "success"})
				}
			})
		}
	})
	});
	var addQuestionQuery = "INSERT INTO Questions (AirDate, QuestionText, DollarValue, AnswerText, ShowNumber) VALUES (" + airDate + ", '" + questionText + "' ," + dollarValue + ", '" + answerText + "' ," + showNumber + ");";
	db.all(addQuestionQuery, [], function (err, questionQuestion) {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		else {
			return res.status(200).json({message: "success"});
		}
	})
});
*/
var port = process.env.PORT || 8000;
app.listen(port, function() {
	console.log("Running server on port " + port);
});
