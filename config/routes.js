var path = require('path');

module.exports = function(app){
	
	app.get('/', function(req, res){
		res.send("you don't exist");
	})


	// 48291d0a8499ed77dd9b555542f02f87 << 911
	// 4b0981674c8cee74cf63ec8b23ffc717 << counsel
	// 4c68e7f30b99a82be30c41c99b587ed4 << health
	// 2e937aa8a738825937e1bf07664d4710 << helpme

	app.get('/bot', function(req, res){
		res.send("This is the bot. Please send post request, thx :3");
	})


	app.post('/bot', function(req, res){
		//var data = JSON.parse(req.body);
		res.send(req);
	})

}