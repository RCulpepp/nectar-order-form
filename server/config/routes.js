
var users = require('../controllers/Users.js');
var orders = require('../controllers/Orders.js');
var products = require('../controllers/Products.js');


module.exports = function(app){           
	app.get('/users', users.index);
	app.post('/users', users.create);
	app.get('/users/sessions', users.check);
	app.get('/users/logout', users.logout);
	app.get('/users/:id', users.show);
	app.put('/users/:id', users.update);
	app.delete('/users/:id', users.destroy);
	app.post('/users/login', users.login);
	app.post('/orders', orders.create);
	app.get('/products', products.index);
	app.post('/products', products.create)
	app.post('/orders/distance', orders.distance);
	app.post('/orders/admin', users.login);
	app.get('/orders', orders.index);
	// app.put('/orders/:id', orders.update);
	// app.delete('/orders/:id', orders.destroy);
};