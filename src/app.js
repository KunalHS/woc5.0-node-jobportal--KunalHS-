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

const signUpSchema = {
	_id: String,
	first_name: String,
	last_name: String,
	cpi: Number,
	password: String,
};

const signUpUser = mongoose.model("users", signUpSchema);

app.post("/signUp", function (req, res) {
	signUpUser.exists({ _id: req.body.userEmail }, function (err, doc) {
		if (doc) {
			console.log("User already exisits");
			res.statusMessage =
				'This e-mail address is already in use, <a href="./login.html">login</a>';
			res.send(400);
		} else {
			userData = new signUpUser({
				_id: req.body.userEmail,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				cpi: req.body.cpi,
				password: req.body.password,
			});
			userData.save();
			console.log("New User added");
			res.statusMessage =
				'You are registered, head to the <a href="./login.html">login</a> page';
			res.send(200);
		}
	});
});

//app.post

app.listen(3000, function () {});
