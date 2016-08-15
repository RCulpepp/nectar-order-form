var mongoose = require('mongoose');
var crypto = require('crypto');
//password validator functions
var length = (p) => {return p.length >= 8;}
var number = (p) => {return /[0-9]/.test(p);}
var upper = (p) => {return /[A-Z]/.test(p);}
var special = (p) => {return /\W/.test(p);}
var validators = [{
			validator: length,
			message: 'Passwords must be at least 8 characters long.'
		},{
			validator: number,
			message: 'Passwords must contain at least one number.'
		},{
			validator: upper,
			message: 'Passwords must contain at least one uppercase letter.'
		},{
			validator: special,
			message: 'Passwords must have at least one special character.'
		}];

//User definition
var UserSchema = new mongoose.Schema({
	first_name: {
		type: String, 
		required: [true, 'First name required.']
	},
	last_name: {
		type: String, 
		required: [true, 'Last name required.']
	},
	email: {
		type:String,
		required:[true, 'Email required.']
	},
	password: {
		type: String, 
		required: [true, 'Password required'],
		validate: validators
	},
	pw_salt: String,
	card: String,
	_stripe_id: String,
	user_type: String,
	addresses: [{type: mongoose.Schema.Types.ObjectId, ref:'Address'}],
	orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
}, {timestamps: true});

UserSchema.methods.hashPassword = function(pass){
	var salt = crypto.randomBytes(16).toString('hex');
	pass = crypto.createHmac('sha256', salt).update(pass).digest('hex');
	return [pass, salt]
}

UserSchema.pre('save', function(next){
	var arr = this.hashPassword(this.password);
	this.password = arr[0];
	this.pw_salt = arr[1];
	next();
});

//create model in Mongoose
mongoose.model('User', UserSchema);




	