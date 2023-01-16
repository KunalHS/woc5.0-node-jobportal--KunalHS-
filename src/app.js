const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect(
	"mongodb+srv://KunalHS:passwordforjobby@jobby-jobportal.jrydhvo.mongodb.net/Jobby",
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("mongdb is connected");
		}
	}
);

const userSchema = {
	_id: String,
	first_name: String,
	last_name: String,
	cpi: Number,
	password: String,
};
const user = mongoose.model("users", userSchema);

app.post("/signUp", function (req, res) {
	user.exists({ _id: req.body.userEmail }, function (err, doc) {
		if (doc) {
			console.log("User already exisits");
			res.statusMessage =
				'This e-mail address is already in use, <a href="./login.html">login</a>';
			res.send(400);
		} else {
			userInstance = new user({
				_id: req.body.userEmail,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				cpi: req.body.cpi,
				password: req.body.password,
			});
			userInstance.save();
			console.log("New User added");
			res.statusMessage =
				'You are registered, head to the <a href="./login.html">login</a> page';
			res.send(200);
		}
	});
});

app.post("/login", function (req, res) {
	user.exists(
		{ _id: req.body.userEmail, password: req.body.password },
		function (err, doc) {
			if (doc) {
				console.log("Login Succeful");
				res.statusMessage = "Redirecting....";
				res.send(200);
			} else {
				console.log("Login Failed");
				res.statusMessage = "Wrong username or password, retry";
				res.send(200);
			}
		}
	);
});

const jobSchema = {
	_id: String,
	post_name: String,
	cpi: Number,
	password: String,
};
const job = mongoose.model("jobs", jobSchema);

app.post("/CompanySignup", function (req, res) {
	job.exists(
		{ _id: req.body.companyEmail, post_name: req.body.post_name, cpi: req.body.cpiCriterion },
		function (err, doc) {
			if (doc) {
				console.log("Job Already Posted");
				res.statusMessage = "Job Already Posted, Redirecting....";
				res.send(200);
			} else {
				jobInstance = new job({
					_id: req.body.companyEmail,
					post_name: req.body.post_name,
					cpi: req.body.cpiCriterion,
					password: req.body.password,
				});
				jobInstance.save();
				console.log("New Post added");
				res.statusMessage = "Job is Posted, Redirecting...";
				res.send(200);
			}
		}
	);
});

app.listen(3000, function () {});
