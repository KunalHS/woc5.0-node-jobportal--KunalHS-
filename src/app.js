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
	{ useUnifiedTopology: true }
);

const userModelSchema = {
	_id: String,
	first_name: String,
	last_name: String,
	cpi: Number,
	password: String,
};

const user = mongoose.model("users", userModelSchema);

app.post("/signUp", function (req, res) {
	if (user.findById(req.body.userEmail) != null) {
        res.statusMessage = "This e-mail address is already in use!";
		res.send(400);
	} else {
		userData = new user({
			_id: req.body.userEmail,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			cpi: req.body.cpi,
			password: req.body.password,
		});
		userData.save();
		console.log("New User added");
	}
});

//app.post

app.listen(3000, function () {});
