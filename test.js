var express    = require('express')
var bodyParser = require('body-parser')
var app = express()
var twilio = require('twilio');
var accountSid = 'ACbd0d87dc377f7024036dafbd85bbbcfc';
var authToken = "e7e06bcafce438eafb6dfb459d7a1085";
var client = require('twilio')(accountSid, authToken);

var hasMessageSent = 0;
// parse application/json

//Doctor's phone: +13528712319
//User's phone: 4256159542, +16263479537
app.use(bodyParser.urlencoded())


app.post('/', function(req,res) {
  //console.log(req.body);
  var resp = new twilio.TwimlResponse();
  console.log(req.body.From);
  if (req.body.From == "+13528712319"){ //if the doctor is messaging the user
    console.log("doctor");
    sendBackToUser(req.body.Body, "+14256159542");
    sendBackToUser(req.body.Body, "+16263479537");
  }
  else { //If the user is messaging the doctor
    if (hasMessageSent == 0){
      resp.message("Thank you for using HelpMePrompt. A doctor will be here shortly to help you.");
      hasMessageSent = 1;
    }
    sendBackToUser(req.body.Body, "+13528712319");
    res.send(resp.toString());
  }
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});


/////////////////// Code to send back to the User//////

function sendBackToUser(body, to){
client.messages.create({
    body: body,
    to: to,
    from: "+17164898968"
}, function(err, message) {
    //console.log(err, message);
    if (err == null) {
      console.log(message.sid);
    } else {
      console.error(err);
    }
  });
}
