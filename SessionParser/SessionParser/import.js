var _redis = require("redis")
var redis = _redis.createClient()
var async = require('async')

redis.on("error", function (err) {
	console.log("Error " + err)
});

function join(arr, prefix, callback) {
	if(arr.length == 0) {
		callback([]);
		return;
	}
	var multi = redis.multi();
	for (var i=0; i < arr.length; i++) {
		multi.hgetall(prefix+arr[i]);
	}
	multi.exec(function(err, reply) {
		for (var i=0; i < arr.length; i++) {
			reply[i].id = arr[i]
		}
		callback(reply);
	});
}

function searchDiputado(normalizado) {
	for (var i=0; i < diputados.length; i++) {
		if(diputados[i].nombrenormalizado.indexOf(normalizado, 0) !== -1) {
			return diputados[i]
		}
	}
}

function saveDiputado(normalizado, info, callback) {
	var diputado = searchDiputado(normalizado)
	if (diputado) {
		console.log(diputado)
		
		var multi = redis.multi()
		multi.zadd('diputados', info.puntuacion, diputado.id)
		
		for(key in info) {
			multi.hset('diputado:'+diputado.id, key, info[key])
		}
		
		multi.exec(function(err, response) {
			callback(null, null)
		})
	} else {
		console.log('not found: '+normalizado)
		callback(null, null)
	}
}


var diputados

redis.zrange('diputados', 0, -1, function(err, ids) {
	join(ids, 'diputado:', function(_diputados) {
		diputados = _diputados
		
		async.series([
			function(callback) {
				var info = {
					intervenciones: 20,
					puntuacion: 200
				}

				saveDiputado('caldera-sanchez-capitan', info, callback)
			},

			function foo(callback) {
				console.log('foo')
				callback(null, null)
			}

		], 
		function(err, results) {
			console.log('finished')
			redis.quit();
		});
		
	})
})




