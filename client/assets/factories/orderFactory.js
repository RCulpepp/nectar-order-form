myApp.factory('orderFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.index = function(){
		return new Promise(function(resolve, reject){
			$http.get('/orders').then(function(res){
				if(res.data){
					resolve(res.data);
				} else {
					reject(res.errors);
				}
			});
		});
	}

	this.newOrder = function(orderData, callback){
		//check addrress for nearby location
		$http.post('/orders/distance', orderData.address).then(function(res){
			if(res.statusText == "Continue"){
			// if(true){
				//pre-charge card validation
				// var card = Stripe.card.validateCardNumber(orderData.cardData.number);
				// var expiry = Stripe.card.validateExpiry(orderData.cardData.exp_month, orderData.cardData.exp_year);
				// var cvc = Stripe.card.validateCVC(orderData.cardData.cvc);

				// //process token if all are valid
				// if (card && expiry && cvc){
				// 	Stripe.card.createToken(orderData.cardData, function(status, res){
				// 		if(!res.status){
				// 			orderData.token = res.id
				// 			delete orderData.cardData;
							$http.post('/orders', orderData).then(function(res){
								console.log("Success on order creation request" + res);
								callback(res);
							}, function(res){
								console.log("Failure on order creation request" + res);
								callback(res)
							});
					// 	};
					// });
				// } else {
				// 	callback({err: { card: { message: "The card information you entered is not valid."}}});
				// }
			} else {
				callback({err: { addr: {message: "Unfortunately the address you entered is too far from us."}}});
			}
		}, function(res){
			callback(res.data.error)
		});
	}

	this.saveEmail = function(email){
		this.email = email;
	}

	this.getEmail = function(){
		if(this.email) return this.email
	}
	return this	
}]);