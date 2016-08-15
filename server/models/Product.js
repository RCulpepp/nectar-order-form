var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
	name: {type: String, required: true},
	unit_qty: {type: Number, required: true},
	unit_price: {type: Number, required: true}
});

mongoose.model('Product', ProductSchema)