var express    = require('express')
var bodyParser = require('body-parser')
var app = express()
var twilio = require('twilio');
var accountSid = 'ACbd0d87dc377f7024036dafbd85bbbcfc';
var authToken = "e7e06bcafce438eafb6dfb459d7a1085";
var client = require('twilio')(accountSid, authToken);
var http = require('http');

var hasMessageSent = 0;
// parse application/json

//+13528712319
//User's phone: 4256159542, +16263479537
app.use(bodyParser.urlencoded())


app.post('/', function(req,res) {
  //var docNum = "+14084558851";
  //console.log(req.body);
  var docNum = "+14084558851";
  var resp = new twilio.TwimlResponse();
  console.log(req.body.From);
  if (req.body.From == docNum){ //if the doctor is messaging the user
    console.log("doctor");
    var doctorResponse = req.body.Body;
    sendBackToUser(req.body.Body, "+14256159542");
    sendBackToUser(req.body.Body, "+16263479537");
    //sendBackToUser(req.body.Body, "+13528712319");
    //sendBackToUser(req.body.Body, "+14084558851");
    var URIEncodedReponse = encodeURIComponent(doctorResponse);
    var medicalDefinition = "/objects/727f7ea4-bee6-496e-8f8a-fe14b249bf61/parseText?x=" + URIEncodedReponse;
    http.get({host:"www.wolframcloud.com", path: medicalDefinition}, function(rip){
      var body = "";
      rip.on('data', function(ch) { body += ch })
      rip.on('end',function(){
          var spl = body.split("[");
          if(spl[0] != "StringJoin"){
            sendBackToUser(body, "+14256159542");
            sendBackToUser(body, "+16263479537");
          }
      })
    })
    //sendBackToUser(medicalDefinition, "+13528712319");
  }
  else { //If the user is messaging the doctor
    var text = req.body.Body;
    if (text[0] != '@'){
      resp.message("@prompt: Prompt is the command line interface for the real world.  To get started, send \"@weather 94041\" or \"@flightstats AA12\". Type /help for more.");
    }
    else {
      var sp = text.split(" ");
      if(sp[0] == "@health"){
        resp.message("Thank you for using @health. A doctor will be here shortly to help you.");
      }
      else if(sp[0] == "@911"){
        resp.message("Thank you for using @911. A first responder will contact you shortly to help you.");
      }
      else if(sp[0] == "@help"){
        resp.message("Thank you for using @help. A non-emergency responder will contact you shortly.");
      }
      else if(sp[0] == "@counsel"){
        resp.message("Thank you for using @counsel. A counselor will help you shortly.");
      }
      else if(sp[0] == "@love"){
        resp.message("Thank you for using @love. A love expert will help you... just kidding that's your own problem.");
      }
      else {
        resp.message(": Invalid command: " + text + ". Please try again!");
      }
    }
    sendBackToUser(req.body.Body, docNum);
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
