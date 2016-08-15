var mongoose = require('mongoose');
var sensData = require('../config/sensitive.js');
var customFunc = require("../config/customFunctions.js")
var https = require('https');

var AddressSchema = new mongoose.Schema({
	street1: {
		type: String,
		required: [true, "Address required"]
	},
	street2: String,
	city: {
		type: String,
		required: [true, "City required"]
	},
	state: {
		type: String,
		required: [true, "State required"]
	},
	zip: {
		type: Number,
		required: [true, "Zip Code required"]
	}

}, {timestamps: true});

mongoose.model('Address', AddressSchema)

var OrderSchema = new mongoose.Schema({
	first_name: {type: String, required: [true, "Please tell us your first name."]},
	last_name: {type: String, required: [true, "Please tell us your last name."]},
	receipt_email: String,
	address: [AddressSchema],
	delivery_date: {type: Date, required: [true, "Please let us know when you'd like your delivery."]},
	_product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
	quantity: {type: Number, required: true},
	_stripe_id: String
}, {timestamps: true});

mongoose.model('Order', OrderSchema)