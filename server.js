var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var expressSession = require('express-session');

app.use( bodyParser.json() );

app.use(expressSession({
	secret: 'The world may never know.',
	resave: false,
  	saveUninitialized: true,
  	rolling: true
  }));

var mongoose = require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);


app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));


app.listen(5000, function(){
	console.log('Listening on port 5000');
})