var sensData = require('../config/sensitive.js');
var https = require('https');
module.exports = {
	checkDist: function(addr){
		//create url for Google Distance Matrix API call
		var uri = "/maps/api/distancematrix/json?origins=" + sensData.nectarAddr + "&destinations="
		var addrOrder = ['street1', 'street2', 'city','state','zip']
		for (var i = 0; i < addrOrder.length; i++){
			// if (addr.)
			if (addr[addrOrder[i]] != undefined){
				addr[addrOrder[i]] = addr[addrOrder[i]].trim();
			}
			if (i != addrOrder.length - 1 && addr[addrOrder[i]] != undefined){
				addr[addrOrder[i]] = addr[addrOrder[i]].replace(/\s/g, "+");
				uri += addr[addrOrder[i]] + "+";
			} else if (i == addrOrder.length-1 && addr[addrOrder[i]] != undefined){
				uri += addr[addrOrder[i]]
			};
		};
		uri += "&units=imperial&key=" + sensData.googleDistanceKey;
		//call Google Distance Matrix API
		var options = {
			host: "maps.googleapis.com",
			path: uri
		}

		return new Promise(function(resolve, reject){
			var req = https.request(options, function(res){
				//calculate miles from nectar
				res.setEncoding('utf8');
				res.on('data', function(info){
					console.log(info)
					info = JSON.parse(info);
					console.log(info)
					if(info.rows[0].elements[0].distance.value * .000621371 <= 15){
						console.log('close');
						resolve();
					} else {
						console.log('far');
						reject();
					};
				});
			});
			req.on('error', function(e){
				res.send(e)
			});
			req.end();
		});
		//send request to API
		// closePromise();
	},
	//handles the response from Mongo when a result is found and would result in a go ahead response to client
	posErrorHandler: function(error, record={}, callback){
		if(error){
			res.send(err.validation);
			return;
		} else {
			callback(record)
		};
	},
	//handles the response from Mongo when a result is found and would result in a negative response to client
	negErrorHandler: function(error, record, callback, foundStr){
		if(error){
			res.send(err.validation);
		} else if(!record){
				res.send({email: {message: foundStr}});
		} else {
			callback(record);
		};
	}
}