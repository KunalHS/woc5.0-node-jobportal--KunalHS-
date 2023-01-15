const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", getSignUpInfo);
function getSignUpInfo(event) {
	event.preventDefault();
	data = new FormData(event.target);
	dataObj = Object.fromEntries(data.entries());
	console.log("Login Request Sent");
	console.log(dataObj);
	handleUserLogin(dataObj);
}

async function handleUserLogin(userData) {
	const response = await fetch("http://localhost:3000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	document.getElementById("errMessage").innerHTML = response.statusText;
}
function resetErr() {
	document.getElementById("errMessage").innerHTML = "";
}
document.getElementById("loginEmail").onchange = resetErr;