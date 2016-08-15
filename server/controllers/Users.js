var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
function Users(){

	//get all users
	this.index = function(req,res){

	}

	//make a new user and log them in
	this.create = function(req,res){
		//check if email is already in the system	
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.send(err.validation);
				return;
			}
			//return error if found or if there was a user
			if(user){
				res.send({errors: {email: {message: 'The email you entered already exists in our system or there was a problem with your request.'}}});
				return '';
			} else {
				//break function if headers have been sent.
				var user = new User(req.body);
				user.save(function(err){
					if(err){
						res.send(err.validation);
					} else {
						req.session.name = user.name
						req.session._id = user._id
						res.send(user._id)
					}
				});
			};
		});	
	};

	//get data for one user
	this.show = function(req,res){

	};

	//change info for a user
	this.update = function(req, res){
	
	};

	//delete a thing
	this.destroy = function(req,res){
		
	};
	//log user in
	this.login = function(req, res){
		//check if email is in the system	
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.send(err.validation);
				return;
			} else if(!user){
				res.send({email: {message: 'The email address you entered is not in our database.'}});
			} else if(typeof(user.password) == 'string'){
				var input_pass = crypto.createHmac('sha256', user.pw_salt).update(req.body.password).digest('hex');
				if (input_pass == user.password){
					req.session._id = user._id
					req.session.name = user.name;
					res.send(user._id);
				} else {
					res.send({errors: {password: {message: 'The password you entered does not match our records.'}}});
				};
			}
		});
	};

	


}
module.exports = new Users