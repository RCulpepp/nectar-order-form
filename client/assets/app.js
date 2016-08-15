var myApp = angular.module('myApp',['ngRoute', 'ngAnimate']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: './partials/index.html',
		controller: 'indexController'
	})
	.when('/register', {
		templateUrl: './partials/form.html',
		controller: 'usersController'
	})
	.when('/orders/new', {
		templateUrl: './partials/orderForm.html',
		controller: 'ordersController'
	})
	.when('/orders/success', {
		templateUrl: './partials/orderSuccess.html',
		controller: 'ordersController'
	})
	// .when('/edit/:id', {
	// 	templateUrl: './partials/edit.html',
	// 	controller: 'editController',
	// })
	// .when('/show/:id', {
	// 	templateUrl: './partials/show.html',
	// 	controller: 'showController'
	// })
	.otherwise({
		redirectTo:'/'
	})
});