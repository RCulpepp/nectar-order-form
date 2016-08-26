var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function Products(){
	this.index = function(req,res){
		var products = Product.find({}, function(err, products){
			if(err){
				res.send(err)
			} else {
				res.send({products: products});
			}
		});
		
	}

	this.create = function(req,res){
		console.log(req.body)
		Product.create(req.body, function(err){
			console.log(err)
			if (err){
				res.send({errors: err});
			} else {
				res.send({status: 'Continue'})
			}
		});
	}


}

module.exports = new Products