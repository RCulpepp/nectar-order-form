myApp.factory('orderFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.index = function(){
		$http.get('/orders', function(req,res){

		})
	}

	this.newOrder = function(orderData, callback){
		//check addrress for nearby location
		$http.post('/orders/distance', orderData.address).then(function(res){
			console.log(res)
			if(res.statusText == "Continue"){
				//pre-charge card validation
				var card = Stripe.card.validateCardNumber(orderData.cardData.number);
				var expiry = Stripe.card.validateExpiry(orderData.cardData.exp_month, orderData.cardData.exp_year);
				var cvc = Stripe.card.validateCVC(orderData.cardData.cvc);

				//process token if all are valid
				if (card && expiry && cvc){
					Stripe.card.createToken(orderData.cardData, function(status, res){
						if(!res.status){
							orderData.token = res.id
							delete orderData.cardData;
							$http.post('/orders', orderData).then(function(res){
								console.log("Success on order creation request" + res);
								callback(res);
							}, function(res){
								console.log("Failure on order creation request" + res);
								callback(res)
							});
						};
					});
				} else {
					callback({err: { card: { message: "The card information you entered is not valid."}}});
				}
			} else {
				callback({err: { addr: {message: "Unfortunately the address you entered is too far from us."}}});
			}
		}, function(res){
			console.log(res.data.error);
			callback(res.data.error)
		});
	}

	this.saveEmail = function(email){
		this.email = email;
	}

	this.getEmail = function(){
		this.email ? this.email : '';
	}
	return this	
}]);