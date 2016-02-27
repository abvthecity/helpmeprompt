// routes
var express = require('express');
var app = express();
require('./config/routes.js')(app);

var http = require('http').Server(app);

var path = require('path');
var io = require('socket.io')(http);
//var MongoStore = require('connect-mongo')(session);

/*require('./config/mongoose.js');
require('./config/routes.js')(app);

var mongoose = require('mongoose');**/
/*
var endpoint = 'http://api.dev.promptapp.io/api/1.0/webhook/@health_00041';
var apikey = '4c68e7f30b99a82be30c41c99b587ed4';
var post_data = {"uuid":userkey, "message":"hello world!"}

var options = {
	hostname: 'api.dev.promptapp.io',
	path: '/api/1.0/webhook/@health_00041',
	method: 'POST',
	headers: {
		'Prompt-API-key': apikey
	}
}


var req = http.request(options,function(res){
	console.log(res);
})
*/


req.write(post_data);
req.end();

http.listen(process.env.PORT || 5000, function(){
	console.log("Server up and running on port 5000");
})