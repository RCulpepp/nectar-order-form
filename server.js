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

var admin_dir = '/home/ubuntu/nectar_admin';
var user_client = express.static(path.join(__dirname, 'client'));
var user_bower = express.static(path.join(__dirname, 'bower_components'));
var admin_client = express.static(path.join(admin_dir, 'client'));
var admin_bower = express.static(path.join(admin_dir, 'bower_components'));

app.use(function(req, res, next) {
	if(!req.hostname.includes('admin')) {
		user_client(req,res, function(){
			user_bower(req,res,next);
		})
	} else if (req.hostname == "admin.nectardelivers.com") {
		admin_client(req,res, function(){
			admin_bower(req,res,next);
		})
	} else {
		next();
	}
})

app.listen(5000, function(){
	console.log('Listening on port 5000');
})