myApp.controller('indexController', ['$scope', 'userFactory','$routeParams', function($scope, userFactory, $routeParams) {

	$scope.login = function(){
		user_cred = {
			email: $scope.email,
			password: $scope.password
		}
		userFactory.login(user_cred, function(data){

		});
	};
	
	$scope.add = function(){

	}

	$scope.delete = function(id){
		
	};


}]);