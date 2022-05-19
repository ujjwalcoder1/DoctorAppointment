const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://ujjwal:Ujjwal123@cluster0.baxvh.mongodb.net/userBb?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "doctorAppointment";

var dbInstance = null;
client.connect().then(function(){
	console.log("DB is on");
	dbInstance = client.db(dbName);
})

const express = require('express')
const app = express()
app.use(express.json());
app.use(express.static("FrontEnd"));
const port = 3000

var session = require('express-session');
app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true
}))


app.post("/login", function(req, res){
		var details = [];
		readUsers(function(data){
			// console.log(data);
			details = data;
			// console.log(details);
			var object = req.body;
			var f = 0;
			details.forEach(function(ob){
				console.log(ob.Key);
			})
			var name = [];
			details.forEach(function(ob){
				if(ob.Key === object.Username){
					f = 1;
					if(ob.Detail.Password === object.Password){
						f = 2;
						name = ob.Detail.Name.split(" ");
					}
				}
			})
			var arr = [];
			arr.push(f);
			if(f === 2){
				var na = "";
				name.forEach(function(name){
					na = na + name;
				})
				arr.push(na);
			}
			res.end(JSON.stringify(arr));
		})
})




app.post("/signup", function(req, res){
	  var details = [];
		readUsers(function(data){
			details = data;
			var object = req.body;
			var f = 0;
			details.forEach(function(ob){
				if(ob.Key === object.Key){
					f = 1;
				}
			})
			if(f == 0){
				saveUser(object, function(){
					res.end("Created");
				})
			}
			else{
				res.end("Not Created");
			}
		})
})

app.post("/doclogin", function(req, res){
		var details = [];
		readDocs(function(data){
			// console.log(data);
			details = data;
			// console.log(details);
			var object = req.body;
			var f = 0;
			details.forEach(function(ob){
				console.log(ob.Key);
			})
			var name = [];
			details.forEach(function(ob){
				if(ob.Key === object.Username){
					f = 1;
					if(ob.Detail.Password === object.Password){
						f = 2;
						name = ob.Detail.Name.split(" ");
					}
				}
			})
			var arr = [];
			arr.push(f);
			if(f === 2){
				var na = "";
				name.forEach(function(name){
					na = na + name;
				})
				arr.push(na);
			}
			res.end(JSON.stringify(arr));
		})
})

app.post("/docsignup", function(req, res){
	  var details = [];
		readDocs(function(data){
			details = data;
			var object = req.body;
			var f = 0;
			details.forEach(function(ob){
				if(ob.Key === object.Key){
					f = 1;
				}
			})
			if(f == 0){
				saveDoc(object, function(){
					res.end("Created");
				})
			}
			else{
				res.end("Not Created");
			}
		})
})

function readUsers(callback)
{
	const collection = dbInstance.collection('userList');
	collection.find({}).toArray().then(function(data){
		callback(data);
	})
}

function saveUser(data, callback)
{
	const collection = dbInstance.collection("userList");
	collection.insertOne(data).then(function(){
		callback();
	})
}

function readDocs(callback)
{
	const collection = dbInstance.collection('docList');
	collection.find({}).toArray().then(function(data){
		callback(data);
	})
}

function saveDoc(data, callback)
{
	const collection = dbInstance.collection("docList");
	collection.insertOne(data).then(function(){
		callback();
	})
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})