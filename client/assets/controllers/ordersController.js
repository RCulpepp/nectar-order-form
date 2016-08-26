myApp.controller('ordersController', ['$scope', 'orderFactory', 'productFactory', '$location', function($scope, orderFactory, productFactory, $location){
	function checkFields(pageNum){
		function blankFields(item){
			console.log($scope[item])
			var errField = item + 'Err';
			if ($scope[item] == undefined || $scope[item] == ''){
				$scope[errField] = "Missing";
				errors++;
			} else {
				$scope[errField] = '';
			}
		}
		var errors = 0;
		if (pageNum == 2){
			var fields = ["first_name", "last_name", "email", "product", "quantity"];
			fields.forEach(blankFields);
		} else if (pageNum == 3){
			var fields = ["delivery_date", "street1","city","state","zip"];
			fields.forEach(blankFields);
		} 
		// else if (pageNum == 4){
		// 	var fields = ["card", "exp_month", "exp_year", "cvc"];
		// 	fields.forEach(blankFields);
		// }
		if(errors){
			return false;
		}
		return true;
	};
	//get all poducts currently available
	productFactory.index(function(products){
		$scope.products = products;
	});

	//set order user's email for success page
	$scope.email = orderFactory.getEmail();

	//set today's date
	$scope.today = function(){
		$scope.todayDate = new Date(moment().add(1,'days'));
	}
	$scope.today();

	//options for datepicker
	$scope.dateOptions = {
		minDate: $scope.todayDate,
		showWeeks: false
	}

	//set and change pages for order form
	$scope.page = 1;
	$scope.active = true;

	$scope.moveForward = function(){
		var move_on = checkFields($scope.page);
		if(move_on){
			$scope.page++;
		} 
	}

	$scope.moveBack = function(){
		$scope.page--
	}

	//show datepicker
	$scope.opened = false;
	$scope.open = function(){
		$scope.opened = true;
	}

	//create a new order
	$scope.newOrder = function(){
		$scope.active = false;
		data = {
			first_name: $scope.first_name,
			last_name: $scope.last_name,
			receipt_email: $scope.email,
			_product: $scope.product,
			delivery_date: $scope.delivery_date,
			delivery_time: $scope.delivery_time,
			quantity: $scope.quantity,
			address: {
				street1: $scope.street1,
				street2: $scope.street2,
				city: $scope.city,
				state: $scope.state,
				zip: $scope.zip
			}
			// cardData: {
			// 	number: $scope.card,
			// 	exp_month: $scope.exp_month,
			// 	exp_year: $scope.exp_year,
			// 	cvc: $scope.cvc
			// }
		}
		orderFactory.newOrder(data, function(error){
			if(error.err){
				if(error.err.card){
					$scope.cardDataErr = error.err.card.message;
					$scope.page = 4;
					$scope.active = true;
				} else if(error.err.addr){
					$scope.addrErr = error.err.addr.message;
					$scope.page = 3;
					$scope.active = true;
				}
			} else {
				console.log($scope.email);
				orderFactory.saveEmail($scope.email); 
				$location.url('orders/success');
				$scope.email = orderFactory.getEmail();
			}
		});
	}
	// $scope.getEmail = function(){
	// 	$scope.email = orderFactory.getEmail();
	// }
}]);