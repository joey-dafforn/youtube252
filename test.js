 function hello() {

 	var x = new XMLHttpRequest()
 	var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=cat&key=AIzaSyB6777g3SQvVsgbtOG6iHlL8R2NAl_i1B4"

	x.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var string = this.response
			alert(string)
		}
		else {
			console.log("didnt go through")
		}
	}

	x.open("GET", request, true)
	x.setRequestHeader("Content-type", "application/json")
	x.send()
	
}

// function init() {
// 	gapi.client.setApiKey("AIzaSyB6777g3SQvVsgbtOG6iHlL8R2NAl_i1B4")
// 	gapi.client.load("youtube", "v3", function() {
// 		// api is ready
// 	})
// }