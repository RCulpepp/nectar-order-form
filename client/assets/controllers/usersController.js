myApp.controller('usersController', ['$scope','userFactory', '$http', '$location', function($scope,userFactory, $http, $location) {
	$scope.user = userFactory.user
	$scope.regisErrors = userFactory.regisErrors
	$scope.create = function(){
		var user = {
			fname: $scope.fname,
			lname: $scope.lname,
			email: $scope.email
		}
			userFactory.findUser(user.email, function(err, user){
				if(err){
					$scope.error = err
				} else if (typeof(data) == 'object'){
					$scope.error = 'The email address you entered is already being used.'
				} else {
					userFactory.create(user, function(data){
						$location.url('/dashboard')
					});
				};
			});
			user.pass
		}

	$scope.login = function(){
		var userData = {
			email: $scope.email,
			password: $scope.password
		}
		userFactory.login(userData, function(err){
			if(err){
				$scope.loginErr = err;
			} else {
				$location.url('/orders/dashboard')
			}
		})
	};
}]);
