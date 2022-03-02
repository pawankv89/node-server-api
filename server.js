var express = require('express');
var app = express();
var fs = require("fs");
//const cors = require('cors');
const bodyParser = require('body-parser'); // This is required for body request

//app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Users List
//http://127.0.0.1:8081/users
app.get('/users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      // Content Type: application/json
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end( data );
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

// Add User Static
var user = {
 "user4" : {
   "name" : "Pawan Angular",
   "password" : "PA@123",
   "profession" : "Angular Develoer",
   "id": 4
  }
}

// http://127.0.0.1:8081/addUser
app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      // Content Type: application/json
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end( JSON.stringify(data));
   });
})

// Add User Daynamic
// http://127.0.0.1:8081/add
app.post('/add', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      const body = req.body;
      data["user4"] = body;
      console.log( body );
      // Content Type: application/json
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end( JSON.stringify(data));
   });
})


// User Details
//http://127.0.0.1:8081/2
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      // Content Type: application/json
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end( JSON.stringify(user));
   });
})

// Delete User Id 1
//http://127.0.0.1:8081/deleteUser
app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 1];
       
      console.log( data );
      // Content Type: application/json
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end( JSON.stringify(data));
   });
})

// Delete User Id any
//http://127.0.0.1:8081/deleteUser/3
app.delete('/deleteUser/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + req.params.id];
       
      console.log( data );
      // Content Type: application/json
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end( JSON.stringify(data));
   });
})