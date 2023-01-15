const passw = document.getElementById("signupPassword"),
	cpassw = document.getElementById("signupConfirmPassword");
function validatePassword() {
	if (passw.value != cpassw.value) {
		cpassw.setCustomValidity("Write same password");
	} else {
		cpassw.setCustomValidity("");
	}
}
passw.onchange = validatePassword;
cpassw.onkeyup = validatePassword;

const cpi = document.getElementById("cpi");
function validateCPI() {
	if (cpi.value < 0 || cpi.value > 10) {
		cpi.setCustomValidity("CPI must be between 0 and 10");
	} else {
		cpi.setCustomValidity("");
	}
}
cpi.onchange = validateCPI;
cpi.onkeyup = validateCPI;

const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", getSignUpInfo);
function getSignUpInfo(event) {
	event.preventDefault();
	data = new FormData(event.target);
	dataObj = Object.fromEntries(data.entries());
	console.log("New User request Sent");
	console.log(dataObj);
	handleUserSignup(dataObj);
}

async function handleUserSignup(userData) {
	const response = await fetch("http://localhost:3000/signUp", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	document.getElementById("errMessage").innerHTML = response.statusText;
	document.getElementById("aau").innerHTML = "";
}
function resetErr() {
	document.getElementById("errMessage").innerHTML = "";
}
document.getElementById("signupEmail").onchange = resetErr;
