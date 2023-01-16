const passw = document.getElementById("companyPassword"),
	cpassw = document.getElementById("companyConfirmPassword");
function validatePassword() {
	if (passw.value != cpassw.value) {
		cpassw.setCustomValidity("Write same password");
	} else {
		cpassw.setCustomValidity("");
	}
}
passw.onchange = validatePassword;
cpassw.onkeyup = validatePassword;

const cpi = document.getElementById("cpiCriterion");
function validateCPI() {
	if (cpi.value < 0 || cpi.value > 10) {
		cpi.setCustomValidity("CPI must be between 0 and 10");
	} else {
		cpi.setCustomValidity("");
	}
}
cpi.onchange = validateCPI;
cpi.onkeyup = validateCPI;

const signUpForm = document.getElementById("jobPostForm");
signUpForm.addEventListener("submit", getSignUpInfo);
function getSignUpInfo(event) {
	event.preventDefault();
	data = new FormData(event.target);
	dataObj = Object.fromEntries(data.entries());
	console.log("New User request Sent");
	console.log(dataObj);
	handleCompanySignup(dataObj);
}

async function handleCompanySignup(CompanyData) {
	const response = await fetch("http://localhost:3000/CompanySignup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(CompanyData),
	});
	document.getElementById("errMessage").innerHTML = response.statusText;
}
function resetErr() {
	document.getElementById("errMessage").innerHTML = "";
}
document.getElementById("companyEmail").onchange = resetErr;
