myApp.factory('productFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.index = function(callback){
		$http.get('/products').then(function(res){
			callback(res.data.products);
			console.log(this.products);
		}, function(res){
			console.log(res)
		});
		return this.products;
	}
	return this;
}]);