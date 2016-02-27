var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoStore = require('connect-mongo')(session);

/*require('./config/mongoose.js');
require('./config/routes.js')(app);

var mongoose = require('mongoose');**/

http.listen(8000, function(){
	console.log("Server up and running on port 8000");
})