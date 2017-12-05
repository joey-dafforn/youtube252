 function hello() {

 	var x = new XMLHttpRequest()
 	var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=cat&key=AIzaSyB6777g3SQvVsgbtOG6iHlL8R2NAl_i1B4"

	x.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var string = this.response
			var obj = string.substring(string.indexOf("items") + 7, string.length - 2)
			var results_array = JSON.parse(obj)
			//alert(JSON.stringify(results_array[0]))
			for (i = 0; i < results_array.length; i++) {
				var row = document.createElement("div")
				var title = document.createElement("div")

				var result = JSON.stringify(results_array[i])

				title.innerHTML = result.substring(result.indexOf("title"), result.indexOf("thumbnails") - 7)
				row.appendChild(title)

				divFriendsList.appendChild(row)
			}

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