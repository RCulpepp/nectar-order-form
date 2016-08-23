var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Address = mongoose.model('Address');
var Product = mongoose.model('Product');
var crypto = require('crypto');
var sensData = require("../config/sensitive.js");
var customFunc = require("../config/customFunctions.js");
var stripe = require("stripe")(sensData.stripeTestKey);
function Orders(){
	//for admin to display all orders
	this.index = function(req,res){
		var orders = Order.find({}, function(err, orders){
			res.send(orders);
		});
	}

	this.distance = function(req,res){
		//check distance from Nectar
		customFunc.checkDist(req.body).then(function(info){
				res.statusCode = 200;
				res.statusMessage = 'Continue'
				res.send({});
			}, function(){
				res.statusCode = 200;
				res.statusMessage = 'Too far'
				res.send({});
			});
	}

	//submit form to this method
	this.create = function(req,res){
		var order = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				receipt_email: req.body.receipt_email,
				_product: req.body._product,
				delivery_date: req.body.delivery_date,
				quantity: req.body.quantity
			}

			Product.findOne({_id: order._product}, function(error, product){
				if(error){
					res.send(error)
				} else {
					//process charge
					var charge = stripe.charges.create({
						amount: order.quantity * product.unit_price,
						currency: 'usd',
						source: req.body.token,
						description: "Nectar Food Delivery"
						}, function(err, charge){
							if(err){
								res.send(err);
							} else {
								//save order in DB once stripe is successful
								order._stripe_id = charge.id;
								order = new Order(order);
								//create address once order is created
								address = new Address(req.body.address);
								order.address.push(address);
								order.save(function(err){
									if(err){
										res.send(err.errors);
									} else {
										res.send({message:"Order saved"})
									};
								});	
							};
						});
				}
			});
	};

	this.update = function(req,res){
		order = {
			delivery_date: req.body.date,
			delivery_address: [req.body.street1, req.body.street2, req.body.city, req.body.state, req.body.zip]
		}
		Order.findOne({_id: req.body.id}, {$set: order}, function(err){
			if(err){
				
			};
		});
	}
};
module.exports = new Orders