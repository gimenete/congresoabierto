var async = require('async')
var assert = require('assert')

var _redis = require("redis")
var redis = _redis.createClient()

redis.on("error", function (err) {
	console.log("Error " + err);
});

var diputado1 = {
	name: 'José Luis Rodriguez Zapatero',
	email: 'joseluisrodriguezzapatero@congreso.es'
}

redis.flushall();

function printCurrentTest() {
	console.log(arguments.callee.caller.name);
}

async.series([
	function testScrapDiputado(callback) {
		printCurrentTest();
		
		callback(null, null);
	}

], 
function(err, results) {
	redis.quit();
});

