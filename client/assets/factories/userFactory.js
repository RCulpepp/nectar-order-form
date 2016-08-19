myApp.factory('userFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.user = {};
	this.regisErrors = [];
	this.loginErrors = [];
	
	this.login = function(user, callback) => {
		$http.post('/orders/admin', user_data, function(res){
			if(error){
				callback() //callback needs appropriate data from returned error.
							// error represents an error with the request
			} else if (res.data.user){
				//What happens when the user information is correct?
			} else {
				//What happens when the user information is incorrect?
			}
		});
	}
	this.findUser = function(email, callback){
		$http.get('/users', function(data){
			if(data.err){
				callback(data,{})
			} else {
				callback({}, data)
			}
		})
	}

	this.show = function(id, callback){
      
    };
	this.showAll = function(callback){
      
    };

	this.create = function(user, callback){
		$http.post('/users', user, function(data){
			if(typeof(data.errors) == 'object'){
				this.regisErrors.push(data.errors)
			}

			if(typeof(data.user) == 'object'){

			}
		})
	};

	this.update = function(thing_data, callback){
		
	};

	this.delete = function(id){
		
	};


    return this;
}]);