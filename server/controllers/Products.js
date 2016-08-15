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


}

module.exports = new Products