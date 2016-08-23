
var users = require('../controllers/Users.js');
var orders = require('../controllers/Orders.js');
var products = require('../controllers/Products.js');


module.exports = function(app){           
	app.get('/users', users.index);
	app.post('/users', users.create);
	app.get('/users/:id', users.show);
	app.put('/users/:id', users.update);
	app.delete('/users/:id', users.destroy);
	app.post('/users/login', users.login);
	app.post('/orders', orders.create);
	app.get('/products', products.index);
	app.post('/orders/distance', orders.distance);
	app.post('/orders/admin', users.login);
	// app.get('/orders/:id', orders.show);
	// app.put('/orders/:id', orders.update);
	// app.delete('/orders/:id', orders.destroy);
};