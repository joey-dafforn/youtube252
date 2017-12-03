function load() {
	document.getElementById("txtUserID").value = ""
	document.getElementById("txtPassword").value = ""
}

function signin() {

	var username = document.getElementById("txtUserID").value;
	var pass = document.getElementById("txtPassword").value;

	var x = new XMLHttpRequest()
	
	x.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert("success")
			window.location.href = "youtube.html"
		}
	}

	x.open("POST", "http://localhost:8000/signin", true)
	x.setRequestHeader("Content-type", "application/json")
	x.send(JSON.stringify({userID: username, password: pass}))

}