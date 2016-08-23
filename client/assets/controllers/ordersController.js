myApp.controller('ordersController', ['$scope', 'orderFactory', 'productFactory', '$location', function($scope, orderFactory, productFactory, $location){
	function checkFields(pageNum){
		function blankFields(item){
			console.log($scope[item])
			var errField = item + 'Err';
			if ($scope[item] == undefined || $scope[item] == ''){
				$scope[errField] = "Missing";
				errors++;
			} else {
				$scope[errField] = ''
			}
		}
		var errors = 0;
		if (pageNum == 2){
			var fields = ["first_name", "last_name", "email", "product", "quantity"];
			fields.forEach(blankFields);
		} else if (pageNum == 3){
			var fields = ["delivery_date", "street1","city","state","zip"];
			fields.forEach(blankFields);
		} else if (pageNum == 4){
			var fields = ["card", "exp_month", "exp_year", "cvc"];
			fields.forEach(blankFields);
		}
		if(errors){
			return false;
		}
		return true;
	};
	//get all poducts currently available
	productFactory.index(function(products){
		$scope.products = products;
	});

	//set order user's email for success pagel
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
	$scope.opened = false;
	$scope.open = function(){
		$scope.opened = true;
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
	//options for timepicker
	$scope.max = moment().hour(17);
	$scope.min = moment().hour(9);


	$scope.moveBack = function(){
		$scope.page--
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
			quantity: $scope.quantity,
			address: {
				street1: $scope.street1,
				street2: $scope.street2,
				city: $scope.city,
				state: $scope.state,
				zip: $scope.zip
			},
			cardData: {
				number: $scope.card,
				exp_month: $scope.exp_month,
				exp_year: $scope.exp_year,
				cvc: $scope.cvc
			}
		}
		
		orderFactory.newOrder(data, function(error){
			if(error.err){
				if(error.err.card){
					$scope.cardDataErr = error.err.card.message;
					$scope.page = 3;
					$scope.active = true;
				} else if(error.err.addr){
					$scope.addrErr = error.err.addr.message;
					$scope.page = 2;
					$scope.active = true;
				}
			} else {
				orderFactory.saveEmail(email); 
				$location.url('orders/success')
			}
		})
	}
}]);