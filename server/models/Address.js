// var mongoose = require('mongoose');
// var sensData = require('../config/sensitive.js');
// var customFunc = require("../config/customFunctions.js")

// var AddressSchema = new mongoose.Schema({
// 	_user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
// 	orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
// 	street1: {
// 		type: String,
// 		required: [true, "Address required"]
// 	},
// 	street2: String,
// 	city: {
// 		type: String,
// 		required: [true, "City required"]
// 	},
// 	state: {
// 		type: String,
// 		required: [true, "State required"]
// 	},
// 	zip: {
// 		type: Number,
// 		required: [true, "Zip Code required"]
// 	}

// }, {timestamps: true});

// mongoose.model('Address', AddressSchema)