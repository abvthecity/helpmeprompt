var path = require('path');

module.exports = function(app){
	
	app.get('/', function(req, res){
		res.send("you don't exist");
	})

	app.get('/bot/@health', function(req, res){
		res.send("you are a health app");
		console.log("@health");
	})

}