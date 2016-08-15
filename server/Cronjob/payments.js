var mongoose = require('mongoose');
var User = mongoose.model('User');
var Subscription = mongoose.model('Subscription');
var Order = mongoose.model('Order');
var sensData = require("../config/sensitive.js")
var stripe = require('stripe')(sensData.stripeTestKey);

Order.find({next_delivery: new Date()}).populate('_user _subscription').exec(function(err, orders){
	if(err){

	} else {
		for(var ind = 0; ind < orders.length; ind++){
			stripe.subscriptions.create({
				customer: orders[ind]._user.stripe_id,
				plan: orders[ind]._subscription.type,
				source: orders[ind]._user.card,
				tax_percent: 8.25
			});
		};
	};
});