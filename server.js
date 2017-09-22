
var express = require('express');
var app = express();
var moment = require("moment");

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/*", function (req, res) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let object = {}, natural, unix,
      input = req.params[0],
      regex = /\D+/g;
    
  
  if (moment(input).isValid() === false && moment(input * 1000).isValid() === false ) {
    object = "Invalid date format";
  }
  else if ( regex.test(input) ) {
    let date = moment(input);
    unix = date.format("X");
    natural = date.format("MMMM") + " " + date.format("D") + ", " + date.format ("YYYY");
    object.unix = unix;
    object.natural = natural;
  }
  else if (isNaN(input) === false) {
    let date = moment.unix(parseInt(input, 10));
    unix = input;
    natural = date.format("MMMM") + " " + date.format("D") + ", " + date.format ("YYYY");
    object.unix = unix;
    object.natural = natural;
  }
  res.send(object);
});


var listener = app.listen(process.env.PORT);
