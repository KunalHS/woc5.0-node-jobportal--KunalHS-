// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://KunalHS:<passwordforjobby>@jobby.8n2artr.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const url =
	"mongodb+srv://KunalHS:<passwordforjobby>@jobby.8n2artr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "jobby"
const userCollection = "users"

const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", getSignUpInfo);

async function getSignUpInfo(event) {
	console.log("called Function");
	event.preventDefault();
	data = new FormData(event.target);
	dataObj = Object.fromEntries(data.entries());
	console.log(dataObj);
    await createNewUser(dataObj);

	// client.connect(err => {
	//     console.log(err)
	//     const collection = client.db("jobby").collection("users");
	//     collection.insertOne(dataObj);
	//     console.log("Inside db console");
	//     console.log(collection.find());
	//     client.close();
	//   });
}

async function createNewUser(userData) {
	await client.connect();
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	const collection = db.collection(userCollection);

	// the following code examples can be pasted here...

	return "done.";
}
