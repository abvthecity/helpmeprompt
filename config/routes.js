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

		res.writeHead(200, {"Content-Type": "application/json"});

		var endpoint = 'http://api.dev.promptapp.io/api/1.0/webhook/@health_00041';
		var apikey = '4c68e7f30b99a82be30c41c99b587ed4';
		var data = JSON.parse(req.body);
		var userkey = data.uuid;

		var post_data = {"uuid":userkey, "message":"hello world!"}

		var json = JSON.stringify({
			sendmms: true,
			showauthurl: false,
			authstate: null,
			text: "Hello World! You said \"Hello World!\".",
			speech: "Hello World! You said \"Hello World!\".",
			status: "OK",
			webhookreply: null,
			images: [
				{
					imageurl: "http://api.dev.promptapp.io/images/random/helloworld.gif",
					alttext: "Hello World!"
				}
			]
		})

		res.end(json);

		
	})

}