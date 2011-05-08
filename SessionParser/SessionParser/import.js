
var _redis = require('redis')
var redis = _redis.createClient()
var async = require('async')

redis.on('error', function (err) {
	console.log('Error ' + err)
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
              puntuacion: 7,
              intervenciones: 1,
              palabras: 2,
        }
        saveDiputado('representante-del-parlamento-de-galicia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10,
              intervenciones: 1,
              palabras: 5,
        }
        saveDiputado('duran-i-lledida', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10,
              intervenciones: 1,
              palabras: 5,
        }
        saveDiputado('vicepresidenta-aburto-baselga)', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11,
              intervenciones: 1,
              palabras: 6,
        }
        saveDiputado('vazquez-mejuto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11,
              intervenciones: 1,
              palabras: 6,
        }
        saveDiputado('murria-climent', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13,
              intervenciones: 1,
              palabras: 8,
        }
        saveDiputado('llamares-trigo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13,
              intervenciones: 1,
              palabras: 8,
        }
        saveDiputado('esteve-ortiga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15,
              intervenciones: 1,
              palabras: 10,
        }
        saveDiputado('lopez-de-forondavargas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15,
              intervenciones: 1,
              palabras: 10,
        }
        saveDiputado('eiras-rey', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17,
              intervenciones: 1,
              palabras: 12,
        }
        saveDiputado('cullera-i-mestres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18,
              intervenciones: 1,
              palabras: 13,
        }
        saveDiputado('perez-herriz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18,
              intervenciones: 1,
              palabras: 13,
        }
        saveDiputado('montalaban-goicoechea', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18,
              intervenciones: 1,
              palabras: 13,
        }
        saveDiputado('montalban-goicoeheca', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20,
              intervenciones: 1,
              palabras: 15,
        }
        saveDiputado('loscertales-fuentes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20,
              intervenciones: 1,
              palabras: 15,
        }
        saveDiputado('canillera-i-mestres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 24,
              intervenciones: 1,
              palabras: 19,
        }
        saveDiputado('rodriguez-pascual', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25,
              intervenciones: 1,
              palabras: 20,
        }
        saveDiputado('la-señora-vicepresidenta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26,
              intervenciones: 1,
              palabras: 21,
        }
        saveDiputado('vicepresidenta-corral-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26,
              intervenciones: 1,
              palabras: 21,
        }
        saveDiputado('garcia-serna', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26,
              intervenciones: 1,
              palabras: 21,
        }
        saveDiputado('cunillera-i-mestre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 33,
              intervenciones: 1,
              palabras: 28,
        }
        saveDiputado('guerra-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 36,
              intervenciones: 1,
              palabras: 31,
        }
        saveDiputado('lopez-rodriguez.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 36,
              intervenciones: 1,
              palabras: 31,
        }
        saveDiputado('lanzuela-martina', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 37,
              intervenciones: 1,
              palabras: 32,
        }
        saveDiputado('bemabeu-pastor', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 38,
              intervenciones: 1,
              palabras: 33,
        }
        saveDiputado('presiente', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 40,
              intervenciones: 1,
              palabras: 35,
        }
        saveDiputado('vicepresidente-primero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 42,
              intervenciones: 1,
              palabras: 32,
              "p_terrorismo":5,
        }
        saveDiputado('madero-jarabajo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45,
              intervenciones: 1,
              palabras: 40,
        }
        saveDiputado('velazquez-lopez.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45,
              intervenciones: 1,
              palabras: 39,
              "p_infraestructuras":1,
        }
        saveDiputado('jorquera-casela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 49,
              intervenciones: 2,
              palabras: 39,
        }
        saveDiputado('vipresidente', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 49,
              intervenciones: 1,
              palabras: 44,
        }
        saveDiputado('vicepresident', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50,
              intervenciones: 1,
              palabras: 40,
              "p_terrorismo":5,
        }
        saveDiputado('rico-alcover', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50,
              intervenciones: 2,
              palabras: 40,
        }
        saveDiputado('barrios-de-penagos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50,
              intervenciones: 2,
              palabras: 40,
        }
        saveDiputado('mendizabal-gorostiaga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50,
              intervenciones: 1,
              palabras: 45,
        }
        saveDiputado('cunillera-y-mestres.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 53,
              intervenciones: 1,
              palabras: 48,
        }
        saveDiputado('aburto-b-aselga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 53,
              intervenciones: 1,
              palabras: 48,
        }
        saveDiputado('gallastegui-oyarzabal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 54,
              intervenciones: 1,
              palabras: 49,
        }
        saveDiputado('jonquera-cassels', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 56,
              intervenciones: 1,
              palabras: 51,
        }
        saveDiputado('amuelo-moral', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 56,
              intervenciones: 1,
              palabras: 51,
        }
        saveDiputado('ridado-i-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 66,
              intervenciones: 2,
              palabras: 56,
        }
        saveDiputado('benegas-hadadd', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 66,
              intervenciones: 1,
              palabras: 61,
        }
        saveDiputado('garcia-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 66,
              intervenciones: 1,
              palabras: 14,
              "p_economía":47,
        }
        saveDiputado('herrera-me-decia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 68,
              intervenciones: 2,
              palabras: 58,
        }
        saveDiputado('barrio-de-penagos.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 68,
              intervenciones: 1,
              palabras: 63,
        }
        saveDiputado('caja-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 69,
              intervenciones: 1,
              palabras: 64,
        }
        saveDiputado('escolano-bello', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 70,
              intervenciones: 1,
              palabras: 60,
              "p_terrorismo":5,
        }
        saveDiputado('fraser-prymme', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 75,
              intervenciones: 1,
              palabras: 70,
        }
        saveDiputado('lahera-sanz-de-diego', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 76,
              intervenciones: 1,
              palabras: 71,
        }
        saveDiputado('lopez-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 77,
              intervenciones: 1,
              palabras: 72,
        }
        saveDiputado('monserrat-monserrat', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 79,
              intervenciones: 1,
              palabras: 74,
        }
        saveDiputado('grande-pesquera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 80,
              intervenciones: 1,
              palabras: 39,
              "p_inmigracion":36,
        }
        saveDiputado('guerra-y-guerra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 84,
              intervenciones: 1,
              palabras: 79,
        }
        saveDiputado('matos-mascaresto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 87,
              intervenciones: 1,
              palabras: 82,
        }
        saveDiputado('canet-i-comas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 89,
              intervenciones: 1,
              palabras: 84,
        }
        saveDiputado('amaro-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 90,
              intervenciones: 1,
              palabras: 85,
        }
        saveDiputado('lahera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 90,
              intervenciones: 1,
              palabras: 85,
        }
        saveDiputado('riera-i-rene', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 91,
              intervenciones: 1,
              palabras: 86,
        }
        saveDiputado('perestelo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 96,
              intervenciones: 2,
              palabras: 86,
        }
        saveDiputado('martinez-sainz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 97,
              intervenciones: 2,
              palabras: 87,
        }
        saveDiputado('pastorjulian', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 98,
              intervenciones: 1,
              palabras: 83,
              "p_terrorismo":10,
        }
        saveDiputado('ricoma-castellarnau', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 99,
              intervenciones: 1,
              palabras: 92,
              "p_medioambiente":2,
        }
        saveDiputado('martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 103,
              intervenciones: 2,
              palabras: 92,
              "p_infraestructuras":1,
        }
        saveDiputado('canongia-girona', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 104,
              intervenciones: 1,
              palabras: 94,
              "p_terrorismo":5,
        }
        saveDiputado('iribar-cuartero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 110,
              intervenciones: 1,
              palabras: 103,
              "p_medioambiente":2,
        }
        saveDiputado('barquin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 110,
              intervenciones: 1,
              palabras: 100,
              "p_terrorismo":5,
        }
        saveDiputado('pigem-palma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 111,
              intervenciones: 2,
              palabras: 101,
        }
        saveDiputado('de-aristegui-y-san-roman', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 114,
              intervenciones: 1,
              palabras: 109,
        }
        saveDiputado('jorquera-bausela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 117,
              intervenciones: 1,
              palabras: 112,
        }
        saveDiputado('martinez-olmos.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 120,
              intervenciones: 1,
              palabras: 113,
              "p_medioambiente":2,
        }
        saveDiputado('marquiegui', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 121,
              intervenciones: 1,
              palabras: 116,
        }
        saveDiputado('garcia-mercader', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 121,
              intervenciones: 1,
              palabras: 114,
              "p_medioambiente":2,
        }
        saveDiputado('rodilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 123,
              intervenciones: 1,
              palabras: 117,
              "p_infraestructuras":1,
        }
        saveDiputado('de-la-fuente-arteagabitia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 126,
              intervenciones: 2,
              palabras: 116,
        }
        saveDiputado('bosch-palma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 127,
              intervenciones: 1,
              palabras: 117,
              "p_educacion":5,
        }
        saveDiputado('gutierrez-olmos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 128,
              intervenciones: 1,
              palabras: 118,
              "p_terrorismo":5,
        }
        saveDiputado('fernandez-de-la-vega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 129,
              intervenciones: 2,
              palabras: 118,
              "p_infraestructuras":1,
        }
        saveDiputado('palmeiro-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 130,
              intervenciones: 2,
              palabras: 105,
              "p_educacion":15,
        }
        saveDiputado('barkos-berrruezo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 137,
              intervenciones: 1,
              palabras: 129,
              "p_infraestructuras":3,
        }
        saveDiputado('sven-valentin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 142,
              intervenciones: 1,
              palabras: 137,
        }
        saveDiputado('de-los-rios-i-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 145,
              intervenciones: 1,
              palabras: 138,
              "p_medioambiente":2,
        }
        saveDiputado('estrada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 149,
              intervenciones: 1,
              palabras: 138,
              "p_terrorismo":5,
              "p_infraestructuras":1,
        }
        saveDiputado('vidal-niebla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 153,
              intervenciones: 1,
              palabras: 147,
              "p_infraestructuras":1,
        }
        saveDiputado('setien-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 163,
              intervenciones: 1,
              palabras: 157,
              "p_justicia":1,
        }
        saveDiputado('magan-pineño', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 163,
              intervenciones: 1,
              palabras: 153,
              "p_terrorismo":5,
        }
        saveDiputado('gutierrez-muelledes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 167,
              intervenciones: 1,
              palabras: 147,
              "p_terrorismo":5,
              "p_educacion":10,
        }
        saveDiputado('calvo-poyatos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 168,
              intervenciones: 1,
              palabras: 163,
        }
        saveDiputado('barkos-berrueco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 169,
              intervenciones: 6,
              palabras: 139,
        }
        saveDiputado('vicepresidenta-segunda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 171,
              intervenciones: 2,
              palabras: 161,
        }
        saveDiputado('ministro-del-interior', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 176,
              intervenciones: 3,
              palabras: 161,
        }
        saveDiputado('loscertales-fuertes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 178,
              intervenciones: 4,
              palabras: 158,
        }
        saveDiputado('gonzalez-rodriguez,-don-adolfo-luis', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 179,
              intervenciones: 1,
              palabras: 174,
        }
        saveDiputado('ordoñez-paton', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 183,
              intervenciones: 1,
              palabras: 178,
        }
        saveDiputado('rumi-ibeñez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 193,
              intervenciones: 1,
              palabras: 180,
              "p_terrorismo":5,
              "p_infraestructuras":3,
        }
        saveDiputado('de-santa-anta-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 197,
              intervenciones: 2,
              palabras: 177,
              "p_vivienda":10,
        }
        saveDiputado('doña-concha-osacar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 211,
              intervenciones: 2,
              palabras: 181,
              "p_educacion":20,
        }
        saveDiputado('trayter-jimenez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 211,
              intervenciones: 1,
              palabras: 206,
        }
        saveDiputado('surroca-i-coma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 211,
              intervenciones: 2,
              palabras: 195,
              "p_terrorismo":5,
              "p_justicia":1,
        }
        saveDiputado('barroso-berrocal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 214,
              intervenciones: 1,
              palabras: 204,
              "p_terrorismo":5,
        }
        saveDiputado('ibañez-talegon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 217,
              intervenciones: 1,
              palabras: 165,
              "p_economía":47,
        }
        saveDiputado('gascon-menal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 222,
              intervenciones: 2,
              palabras: 212,
        }
        saveDiputado('cascales-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 227,
              intervenciones: 1,
              palabras: 210,
              "p_salud y sanidad":12,
        }
        saveDiputado('martïnez-soriano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 228,
              intervenciones: 1,
              palabras: 223,
        }
        saveDiputado('gurgui-ferrer', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 232,
              intervenciones: 1,
              palabras: 227,
        }
        saveDiputado('chavez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 243,
              intervenciones: 3,
              palabras: 228,
        }
        saveDiputado('matos-mascaresio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 247,
              intervenciones: 1,
              palabras: 241,
              "p_infraestructuras":1,
        }
        saveDiputado('ordoñez-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 259,
              intervenciones: 1,
              palabras: 231,
              "p_inseguridad":8,
              "p_terrorismo":5,
              "p_educacion":10,
        }
        saveDiputado('carbonell-serrano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 260,
              intervenciones: 1,
              palabras: 250,
              "p_terrorismo":5,
        }
        saveDiputado('rueda-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 261,
              intervenciones: 1,
              palabras: 246,
              "p_infraestructuras":10,
        }
        saveDiputado('moron-ledro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 262,
              intervenciones: 7,
              palabras: 227,
        }
        saveDiputado('aburto-balsega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 265,
              intervenciones: 1,
              palabras: 255,
              "p_terrorismo":5,
        }
        saveDiputado('cabaña-varales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 270,
              intervenciones: 3,
              palabras: 250,
              "p_terrorismo":5,
        }
        saveDiputado('aburto-basela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 278,
              intervenciones: 1,
              palabras: 273,
        }
        saveDiputado('ricoma-de-catellarnau', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 279,
              intervenciones: 3,
              palabras: 261,
              "p_pensiones":3,
        }
        saveDiputado('figueres-montoro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 282,
              intervenciones: 2,
              palabras: 262,
              "p_terrorismo":10,
        }
        saveDiputado('romañach-cabrero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 282,
              intervenciones: 2,
              palabras: 272,
        }
        saveDiputado('del-castillo-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 283,
              intervenciones: 1,
              palabras: 273,
              "p_terrorismo":5,
        }
        saveDiputado('morlan-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 284,
              intervenciones: 3,
              palabras: 269,
        }
        saveDiputado('ortega-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 291,
              intervenciones: 1,
              palabras: 286,
        }
        saveDiputado('rodriguez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 291,
              intervenciones: 1,
              palabras: 192,
              "p_economía":94,
        }
        saveDiputado('sevilla-segura', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 292,
              intervenciones: 1,
              palabras: 282,
              "p_terrorismo":5,
        }
        saveDiputado('lopez-de-foronda-vargas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 295,
              intervenciones: 1,
              palabras: 290,
        }
        saveDiputado('suarez-bujia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 297,
              intervenciones: 9,
              palabras: 252,
        }
        saveDiputado('rodriguez-salmones-cabezas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 301,
              intervenciones: 1,
              palabras: 295,
              "p_infraestructuras":1,
        }
        saveDiputado('penas-montaña', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 307,
              intervenciones: 1,
              palabras: 301,
              "p_infraestructuras":1,
        }
        saveDiputado('jorquera-casellas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 309,
              intervenciones: 2,
              palabras: 231,
              "p_infraestructuras":1,
              "p_economía":47,
              "p_educacion":20,
        }
        saveDiputado('don-adolfo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 314,
              intervenciones: 2,
              palabras: 298,
              "p_terrorismo":5,
              "p_infraestructuras":1,
        }
        saveDiputado('villegas-molina', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 320,
              intervenciones: 1,
              palabras: 314,
              "p_infraestructuras":1,
        }
        saveDiputado('aznar-garrigues', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 322,
              intervenciones: 1,
              palabras: 126,
              "p_infraestructuras":3,
              "p_economía":188,
        }
        saveDiputado('campoy-suarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 322,
              intervenciones: 1,
              palabras: 314,
              "p_salud y sanidad":3,
        }
        saveDiputado('ramirez-del-molino', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 330,
              intervenciones: 2,
              palabras: 319,
              "p_infraestructuras":1,
        }
        saveDiputado('olaizola-azaldegui', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 331,
              intervenciones: 2,
              palabras: 321,
        }
        saveDiputado('martinez-donoso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 334,
              intervenciones: 1,
              palabras: 320,
              "p_terrorismo":5,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
        }
        saveDiputado('de-la-quintana-diez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 343,
              intervenciones: 1,
              palabras: 338,
        }
        saveDiputado('pedraza-pocero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 346,
              intervenciones: 2,
              palabras: 336,
        }
        saveDiputado('cornax-atienza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 351,
              intervenciones: 1,
              palabras: 298,
              "p_economía":47,
              "p_medioambiente":1,
        }
        saveDiputado('nadal-y-aymerich', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 361,
              intervenciones: 1,
              palabras: 215,
              "p_economía":141,
        }
        saveDiputado('rajoy-decia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 376,
              intervenciones: 1,
              palabras: 371,
        }
        saveDiputado('elorriaga-piserik', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 379,
              intervenciones: 1,
              palabras: 280,
              "p_economía":94,
        }
        saveDiputado('vano-ferre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 382,
              intervenciones: 1,
              palabras: 367,
              "p_terrorismo":10,
        }
        saveDiputado('gimenez-larraz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 389,
              intervenciones: 2,
              palabras: 379,
        }
        saveDiputado('fernandez-leiceaga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 393,
              intervenciones: 1,
              palabras: 388,
        }
        saveDiputado('espinosa-mangada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 403,
              intervenciones: 1,
              palabras: 398,
        }
        saveDiputado('oramas-gongalez-moro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 405,
              intervenciones: 1,
              palabras: 398,
              "p_justicia":2,
        }
        saveDiputado('gimenez-candela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 411,
              intervenciones: 1,
              palabras: 401,
              "p_terrorismo":5,
        }
        saveDiputado('fernandez-de-moya-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 419,
              intervenciones: 2,
              palabras: 408,
              "p_infraestructuras":1,
        }
        saveDiputado('navas-gutierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 420,
              intervenciones: 1,
              palabras: 415,
        }
        saveDiputado('aecj', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 420,
              intervenciones: 2,
              palabras: 400,
              "p_terrorismo":10,
        }
        saveDiputado('lopez-maquieira', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 424,
              intervenciones: 1,
              palabras: 409,
              "p_terrorismo":10,
        }
        saveDiputado('pedret-grenzner', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 425,
              intervenciones: 1,
              palabras: 373,
              "p_economía":47,
        }
        saveDiputado('campuzano-dice', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 426,
              intervenciones: 1,
              palabras: 411,
              "p_terrorismo":10,
        }
        saveDiputado('monton-jimenez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 435,
              intervenciones: 1,
              palabras: 383,
              "p_economía":47,
        }
        saveDiputado('ico', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 438,
              intervenciones: 1,
              palabras: 425,
              "p_inseguridad":8,
        }
        saveDiputado('vargas-rincon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 443,
              intervenciones: 1,
              palabras: 430,
              "p_medioambiente":8,
        }
        saveDiputado('de-la-serna-hernaiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 448,
              intervenciones: 1,
              palabras: 435,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
        }
        saveDiputado('barrena-salces', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 450,
              intervenciones: 3,
              palabras: 378,
              "p_economía":47,
              "p_terrorismo":10,
        }
        saveDiputado('saenz-de-santamaria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 457,
              intervenciones: 2,
              palabras: 447,
        }
        saveDiputado('lopez-riesco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 460,
              intervenciones: 1,
              palabras: 455,
        }
        saveDiputado('bernal-bernal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 462,
              intervenciones: 1,
              palabras: 452,
              "p_terrorismo":5,
        }
        saveDiputado('rojo-torrecillas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 464,
              intervenciones: 1,
              palabras: 456,
              "p_salud y sanidad":3,
        }
        saveDiputado('perez-herranz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 466,
              intervenciones: 1,
              palabras: 436,
              "p_terrorismo":25,
        }
        saveDiputado('gonzales-vazquez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 470,
              intervenciones: 1,
              palabras: 361,
              "p_terrorismo":10,
              "p_economía":94,
        }
        saveDiputado('calabuch-rull', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 472,
              intervenciones: 1,
              palabras: 462,
              "p_terrorismo":5,
        }
        saveDiputado('campuzno-i-canades', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 478,
              intervenciones: 2,
              palabras: 463,
              "p_terrorismo":5,
        }
        saveDiputado('treseras-ribo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 481,
              intervenciones: 2,
              palabras: 466,
              "p_terrorismo":5,
        }
        saveDiputado('muñoz-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 484,
              intervenciones: 3,
              palabras: 469,
        }
        saveDiputado('ballester-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 492,
              intervenciones: 3,
              palabras: 372,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
              "p_economía":94,
              "p_pensiones":3,
        }
        saveDiputado('soriano-alfaro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 493,
              intervenciones: 2,
              palabras: 482,
              "p_infraestructuras":1,
        }
        saveDiputado('de-la-roza-braga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 494,
              intervenciones: 1,
              palabras: 455,
              "p_vivienda":25,
              "p_pensiones":9,
        }
        saveDiputado('osacar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 495,
              intervenciones: 2,
              palabras: 484,
              "p_medioambiente":1,
        }
        saveDiputado('lamparero-lazaro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 496,
              intervenciones: 1,
              palabras: 466,
              "p_infraestructuras":1,
              "p_salud y sanidad":24,
        }
        saveDiputado('leire-pajin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 497,
              intervenciones: 2,
              palabras: 353,
              "p_empleo":82,
              "p_economía":47,
              "p_educacion":5,
        }
        saveDiputado('cogollos-paja', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 502,
              intervenciones: 2,
              palabras: 429,
              "p_economía":47,
              "p_pensiones":6,
              "p_educacion":10,
        }
        saveDiputado('cugat-y-leseurs', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 506,
              intervenciones: 2,
              palabras: 423,
              "p_terrorismo":5,
              "p_vivienda":20,
              "p_economía":47,
              "p_justicia":1,
        }
        saveDiputado('rodriguez-avial', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 511,
              intervenciones: 1,
              palabras: 365,
              "p_economía":141,
        }
        saveDiputado('montero-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 513,
              intervenciones: 1,
              palabras: 506,
              "p_justicia":2,
        }
        saveDiputado('rodriguez-hidalgo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 520,
              intervenciones: 4,
              palabras: 490,
              "p_inseguridad":8,
              "p_infraestructuras":2,
        }
        saveDiputado('fauria-botella', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 522,
              intervenciones: 2,
              palabras: 510,
              "p_infraestructuras":2,
        }
        saveDiputado('echaniz-delgado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 523,
              intervenciones: 2,
              palabras: 510,
              "p_salud y sanidad":3,
        }
        saveDiputado('pascual-lizana', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 525,
              intervenciones: 1,
              palabras: 495,
              "p_terrorismo":5,
              "p_educacion":20,
        }
        saveDiputado('almunia-badio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 529,
              intervenciones: 1,
              palabras: 496,
              "p_guerra":3,
              "p_justicia":1,
              "p_inmigracion":24,
        }
        saveDiputado('saez-barriga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 538,
              intervenciones: 1,
              palabras: 531,
              "p_infraestructuras":2,
        }
        saveDiputado('rull-i-andreu', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 543,
              intervenciones: 2,
              palabras: 527,
              "p_terrorismo":5,
              "p_medioambiente":1,
        }
        saveDiputado('navarro-jimenez-asenjo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 550,
              intervenciones: 7,
              palabras: 512,
              "p_salud y sanidad":3,
        }
        saveDiputado('muñumel-diez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 553,
              intervenciones: 1,
              palabras: 546,
              "p_guerra":2,
        }
        saveDiputado('diaz-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 554,
              intervenciones: 1,
              palabras: 489,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
              "p_vivienda":5,
              "p_economía":47,
        }
        saveDiputado('fraser-prynne', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 555,
              intervenciones: 2,
              palabras: 463,
              "p_empleo":82,
        }
        saveDiputado('rodriguez-villasante-prieto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 558,
              intervenciones: 2,
              palabras: 536,
              "p_medioambiente":12,
        }
        saveDiputado('rubio-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 559,
              intervenciones: 2,
              palabras: 495,
              "p_economía":47,
              "p_terrorismo":5,
              "p_infraestructuras":2,
        }
        saveDiputado('nvumba-mañana', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 566,
              intervenciones: 2,
              palabras: 549,
              "p_infraestructuras":2,
              "p_terrorismo":5,
        }
        saveDiputado('rodriguez-uribes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 569,
              intervenciones: 1,
              palabras: 564,
        }
        saveDiputado('lacasa-cordoba', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 573,
              intervenciones: 1,
              palabras: 562,
              "p_salud y sanidad":3,
              "p_justicia":3,
        }
        saveDiputado('damborenea-basterrechea', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 576,
              intervenciones: 1,
              palabras: 571,
        }
        saveDiputado('aguirre-gil-de-biedma.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 587,
              intervenciones: 3,
              palabras: 572,
        }
        saveDiputado('vazquez-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 591,
              intervenciones: 1,
              palabras: 555,
              "p_terrorismo":5,
              "p_pensiones":6,
              "p_educacion":20,
        }
        saveDiputado('ayuso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 591,
              intervenciones: 1,
              palabras: 586,
        }
        saveDiputado('campos-artesero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 593,
              intervenciones: 1,
              palabras: 588,
        }
        saveDiputado('cerviño-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 595,
              intervenciones: 2,
              palabras: 583,
              "p_infraestructuras":2,
        }
        saveDiputado('adif', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 610,
              intervenciones: 1,
              palabras: 605,
        }
        saveDiputado('hernani-borzaco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 612,
              intervenciones: 3,
              palabras: 589,
              "p_medioambiente":8,
        }
        saveDiputado('peiro-montiel', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 613,
              intervenciones: 2,
              palabras: 588,
              "p_justicia":5,
              "p_educacion":10,
        }
        saveDiputado('ganzenmuller-roig', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 622,
              intervenciones: 3,
              palabras: 592,
              "p_terrorismo":10,
              "p_educacion":5,
        }
        saveDiputado('adolfo-luis', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 629,
              intervenciones: 2,
              palabras: 557,
              "p_educacion":15,
              "p_economía":47,
        }
        saveDiputado('iñiguez-de-onzoño', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 633,
              intervenciones: 2,
              palabras: 623,
        }
        saveDiputado('carrascal-rueda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 635,
              intervenciones: 2,
              palabras: 437,
              "p_economía":188,
        }
        saveDiputado('mora-rosado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 635,
              intervenciones: 1,
              palabras: 584,
              "p_inseguridad":16,
              "p_terrorismo":30,
        }
        saveDiputado('caballero-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 650,
              intervenciones: 1,
              palabras: 551,
              "p_economía":94,
        }
        saveDiputado('cava-de-llano-y-carrio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 651,
              intervenciones: 1,
              palabras: 646,
        }
        saveDiputado('chacon-guitierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 656,
              intervenciones: 1,
              palabras: 646,
              "p_terrorismo":5,
        }
        saveDiputado('dominguez-herguedas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 657,
              intervenciones: 1,
              palabras: 627,
              "p_terrorismo":25,
        }
        saveDiputado('markaida', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 659,
              intervenciones: 2,
              palabras: 629,
              "p_terrorismo":20,
        }
        saveDiputado('pin-arboledas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 660,
              intervenciones: 4,
              palabras: 592,
              "p_inmigracion":48,
        }
        saveDiputado('achutegui-basagoiti', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 668,
              intervenciones: 3,
              palabras: 644,
              "p_terrorismo":5,
              "p_jueventud":4,
        }
        saveDiputado('borja-villel', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 668,
              intervenciones: 1,
              palabras: 658,
              "p_terrorismo":5,
        }
        saveDiputado('suarez-lamata', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 672,
              intervenciones: 1,
              palabras: 619,
              "p_infraestructuras":1,
              "p_economía":47,
        }
        saveDiputado('fernandez-de-mesa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 673,
              intervenciones: 1,
              palabras: 663,
              "p_terrorismo":5,
        }
        saveDiputado('chamorro-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 675,
              intervenciones: 1,
              palabras: 670,
        }
        saveDiputado('barea-luchena', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 683,
              intervenciones: 2,
              palabras: 563,
              "p_terrorismo":15,
              "p_economía":94,
              "p_medioambiente":1,
        }
        saveDiputado('montserrat-monserrat', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 700,
              intervenciones: 1,
              palabras: 689,
              "p_salud y sanidad":6,
        }
        saveDiputado('aesan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 703,
              intervenciones: 2,
              palabras: 618,
              "p_educacion":75,
        }
        saveDiputado('guasch-murillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 708,
              intervenciones: 1,
              palabras: 697,
              "p_medioambiente":6,
        }
        saveDiputado('vieites-baptista', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 717,
              intervenciones: 3,
              palabras: 696,
              "p_terrorismo":5,
              "p_justicia":1,
        }
        saveDiputado('navarro-jimenez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 719,
              intervenciones: 2,
              palabras: 704,
              "p_terrorismo":5,
        }
        saveDiputado('barreda-fontes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 720,
              intervenciones: 2,
              palabras: 688,
              "p_terrorismo":20,
              "p_infraestructuras":2,
        }
        saveDiputado('ramirez-loma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 731,
              intervenciones: 3,
              palabras: 669,
              "p_economía":47,
        }
        saveDiputado('guntin-gurgui', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 744,
              intervenciones: 2,
              palabras: 727,
              "p_terrorismo":5,
              "p_justicia":2,
        }
        saveDiputado('gallego-zuazo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 750,
              intervenciones: 2,
              palabras: 731,
              "p_medioambiente":9,
        }
        saveDiputado('serrano-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 754,
              intervenciones: 8,
              palabras: 712,
              "p_justicia":2,
        }
        saveDiputado('surroca-comas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 755,
              intervenciones: 1,
              palabras: 547,
              "p_terrorismo":15,
              "p_economía":188,
        }
        saveDiputado('mayayo-chueca', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 768,
              intervenciones: 2,
              palabras: 743,
              "p_terrorismo":5,
              "p_medioambiente":10,
        }
        saveDiputado('jimenez-beltran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 780,
              intervenciones: 2,
              palabras: 713,
              "p_terrorismo":10,
              "p_economía":47,
        }
        saveDiputado('martinez-meroño', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 794,
              intervenciones: 1,
              palabras: 788,
              "p_infraestructuras":1,
        }
        saveDiputado('lobeira-dominguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 796,
              intervenciones: 2,
              palabras: 767,
              "p_infraestructuras":1,
              "p_pensiones":18,
        }
        saveDiputado('vicente-alonso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 799,
              intervenciones: 2,
              palabras: 581,
              "p_terrorismo":15,
              "p_economía":188,
              "p_educacion":5,
        }
        saveDiputado('martinez-lazaro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 801,
              intervenciones: 1,
              palabras: 787,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
        }
        saveDiputado('perez-monguio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 809,
              intervenciones: 1,
              palabras: 784,
              "p_terrorismo":5,
              "p_educacion":15,
        }
        saveDiputado('varela-flores', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 813,
              intervenciones: 3,
              palabras: 761,
              "p_infraestructuras":3,
              "p_medioambiente":8,
              "p_clase politica":26,
        }
        saveDiputado('gonzalez-gil-de-bernabe', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 818,
              intervenciones: 1,
              palabras: 578,
              "p_economía":235,
        }
        saveDiputado('heredia-herrera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 819,
              intervenciones: 9,
              palabras: 772,
              "p_jueventud":2,
        }
        saveDiputado('climent-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 819,
              intervenciones: 1,
              palabras: 633,
              "p_empleo":82,
              "p_terrorismo":5,
              "p_economía":94,
        }
        saveDiputado('q-uintanilla-barba', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 826,
              intervenciones: 2,
              palabras: 793,
              "p_terrorismo":15,
              "p_salud y sanidad":3,
              "p_educacion":5,
        }
        saveDiputado('navarro-mangado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 826,
              intervenciones: 1,
              palabras: 818,
              "p_salud y sanidad":3,
        }
        saveDiputado('lamas-alonso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 827,
              intervenciones: 2,
              palabras: 738,
              "p_clase politica":78,
              "p_justicia":1,
        }
        saveDiputado('pedroche-rojo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 827,
              intervenciones: 5,
              palabras: 749,
              "p_pensiones":6,
              "p_economía":47,
        }
        saveDiputado('viguer-miralles', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 828,
              intervenciones: 2,
              palabras: 766,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('mariscal-cifuentes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 830,
              intervenciones: 1,
              palabras: 817,
              "p_terrorismo":5,
              "p_justicia":3,
        }
        saveDiputado('san-julian', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 831,
              intervenciones: 1,
              palabras: 779,
              "p_economía":47,
        }
        saveDiputado('letrado-de-la-comision', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 833,
              intervenciones: 1,
              palabras: 825,
              "p_justicia":1,
              "p_jueventud":2,
        }
        saveDiputado('conesa-minguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 834,
              intervenciones: 1,
              palabras: 824,
              "p_terrorismo":5,
        }
        saveDiputado('gomez-navarro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 838,
              intervenciones: 1,
              palabras: 735,
              "p_economía":94,
              "p_jueventud":4,
        }
        saveDiputado('massana-mas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 847,
              intervenciones: 12,
              palabras: 698,
              "p_infraestructuras":2,
              "p_empleo":82,
              "p_terrorismo":5,
        }
        saveDiputado('letrado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 849,
              intervenciones: 1,
              palabras: 755,
              "p_empleo":82,
              "p_terrorismo":5,
              "p_justicia":2,
        }
        saveDiputado('pelegri-aixut', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 855,
              intervenciones: 2,
              palabras: 668,
              "p_empleo":82,
              "p_economía":94,
              "p_racismo":1,
        }
        saveDiputado('gutierrez-vegara', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 856,
              intervenciones: 2,
              palabras: 799,
              "p_economía":47,
        }
        saveDiputado('sanchez-de-muniain-lacasia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 856,
              intervenciones: 1,
              palabras: 851,
        }
        saveDiputado('rollan-ojeda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 869,
              intervenciones: 1,
              palabras: 853,
              "p_terrorismo":5,
              "p_infraestructuras":6,
        }
        saveDiputado('sau-i-pages', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 873,
              intervenciones: 1,
              palabras: 827,
              "p_inseguridad":8,
              "p_terrorismo":20,
              "p_infraestructuras":1,
              "p_pensiones":12,
        }
        saveDiputado('velasco-dominguez-vidaurreta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 874,
              intervenciones: 1,
              palabras: 703,
              "p_economía":141,
              "p_educacion":25,
        }
        saveDiputado('albendea-pavon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 884,
              intervenciones: 2,
              palabras: 869,
              "p_terrorismo":5,
        }
        saveDiputado('perales-ramirez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 901,
              intervenciones: 2,
              palabras: 839,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('jimenez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 905,
              intervenciones: 1,
              palabras: 793,
              "p_terrorismo":10,
              "p_economía":94,
              "p_justicia":3,
        }
        saveDiputado('rodriguez-piñeiro-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 905,
              intervenciones: 2,
              palabras: 853,
              "p_clase politica":26,
              "p_medioambiente":16,
        }
        saveDiputado('enrique-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 921,
              intervenciones: 1,
              palabras: 890,
              "p_terrorismo":15,
              "p_infraestructuras":2,
              "p_salud y sanidad":3,
              "p_vivienda":5,
              "p_medioambiente":1,
        }
        saveDiputado('marquez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 924,
              intervenciones: 2,
              palabras: 902,
              "p_salud y sanidad":6,
              "p_educacion":5,
              "p_medioambiente":1,
        }
        saveDiputado('rubio-marin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 926,
              intervenciones: 1,
              palabras: 871,
              "p_economía":47,
              "p_justicia":3,
        }
        saveDiputado('riera-ireñe', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 928,
              intervenciones: 1,
              palabras: 829,
              "p_economía":94,
        }
        saveDiputado('ramos-cuadrado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 928,
              intervenciones: 1,
              palabras: 840,
              "p_empleo":82,
              "p_infraestructuras":1,
        }
        saveDiputado('perez-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 931,
              intervenciones: 2,
              palabras: 914,
              "p_educacion":5,
              "p_medioambiente":2,
        }
        saveDiputado('alonso-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 931,
              intervenciones: 3,
              palabras: 898,
              "p_terrorismo":15,
              "p_infraestructuras":3,
        }
        saveDiputado('taboas-suarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 935,
              intervenciones: 4,
              palabras: 623,
              "p_terrorismo":10,
              "p_economía":282,
        }
        saveDiputado('fernandez-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 942,
              intervenciones: 2,
              palabras: 920,
              "p_justicia":2,
              "p_educacion":10,
        }
        saveDiputado('llorente-gomez-de-segura', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 943,
              intervenciones: 2,
              palabras: 881,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('carrascal-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 948,
              intervenciones: 4,
              palabras: 868,
              "p_terrorismo":20,
              "p_educacion":40,
        }
        saveDiputado('bedera-bravo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 959,
              intervenciones: 1,
              palabras: 812,
              "p_infraestructuras":1,
              "p_economía":141,
        }
        saveDiputado('serrano-beltran.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 965,
              intervenciones: 1,
              palabras: 921,
              "p_terrorismo":10,
              "p_infraestructuras":8,
              "p_educacion":20,
              "p_medioambiente":1,
        }
        saveDiputado('mir-soler', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 968,
              intervenciones: 1,
              palabras: 946,
              "p_terrorismo":15,
              "p_infraestructuras":2,
        }
        saveDiputado('manrique-ripoll', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 972,
              intervenciones: 1,
              palabras: 964,
              "p_salud y sanidad":3,
        }
        saveDiputado('borras-i-sole', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 981,
              intervenciones: 5,
              palabras: 946,
              "p_terrorismo":10,
        }
        saveDiputado('jane-guasch', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 982,
              intervenciones: 3,
              palabras: 826,
              "p_economía":141,
        }
        saveDiputado('grijelmo-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 989,
              intervenciones: 2,
              palabras: 974,
              "p_terrorismo":5,
        }
        saveDiputado('bravo-alvarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 993,
              intervenciones: 2,
              palabras: 976,
              "p_infraestructuras":5,
              "p_medioambiente":2,
        }
        saveDiputado('don-juan-jose-potti', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1001,
              intervenciones: 2,
              palabras: 918,
              "p_terrorismo":10,
              "p_economía":47,
              "p_medioambiente":16,
        }
        saveDiputado('puig-de-la-bellacasa-alberola', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1015,
              intervenciones: 2,
              palabras: 953,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('pedroche-y-rojo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1015,
              intervenciones: 1,
              palabras: 999,
              "p_terrorismo":5,
              "p_salud y sanidad":6,
        }
        saveDiputado('ortiz-menendez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1015,
              intervenciones: 1,
              palabras: 925,
              "p_empleo":82,
              "p_salud y sanidad":3,
        }
        saveDiputado('bahamonde-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1025,
              intervenciones: 2,
              palabras: 983,
              "p_terrorismo":5,
              "p_infraestructuras":2,
              "p_educacion":25,
        }
        saveDiputado('caballero-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1028,
              intervenciones: 2,
              palabras: 990,
              "p_justicia":2,
              "p_terrorismo":25,
              "p_infraestructuras":1,
        }
        saveDiputado('vicens-matas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1029,
              intervenciones: 1,
              palabras: 553,
              "p_terrorismo":30,
              "p_economía":376,
              "p_educacion":65,
        }
        saveDiputado('rubiralta-alcañiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1037,
              intervenciones: 2,
              palabras: 1015,
              "p_terrorismo":10,
              "p_infraestructuras":2,
        }
        saveDiputado('tamames-ramirez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1042,
              intervenciones: 4,
              palabras: 925,
              "p_inseguridad":8,
              "p_educacion":15,
              "p_salud y sanidad":3,
              "p_economía":47,
              "p_inmigracion":24,
        }
        saveDiputado('seara-sobrado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1043,
              intervenciones: 2,
              palabras: 1021,
              "p_terrorismo":10,
              "p_medioambiente":2,
        }
        saveDiputado('reinoso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1044,
              intervenciones: 1,
              palabras: 859,
              "p_empleo":82,
              "p_infraestructuras":1,
              "p_economía":94,
              "p_pensiones":3,
        }
        saveDiputado('alvarez-alvarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1044,
              intervenciones: 4,
              palabras: 920,
              "p_terrorismo":25,
              "p_vivienda":55,
              "p_inmigracion":24,
        }
        saveDiputado('ruiz-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1056,
              intervenciones: 1,
              palabras: 1021,
              "p_terrorismo":30,
        }
        saveDiputado('blanco-garrido', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1062,
              intervenciones: 2,
              palabras: 1051,
              "p_infraestructuras":1,
        }
        saveDiputado('quintana-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1073,
              intervenciones: 1,
              palabras: 967,
              "p_infraestructuras":7,
              "p_economía":94,
        }
        saveDiputado('labandera-ganachipi', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1076,
              intervenciones: 3,
              palabras: 1041,
              "p_educacion":20,
        }
        saveDiputado('arnau-ripolles', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1087,
              intervenciones: 2,
              palabras: 1076,
              "p_medioambiente":1,
        }
        saveDiputado('garrido-diez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1092,
              intervenciones: 2,
              palabras: 1023,
              "p_terrorismo":5,
              "p_infraestructuras":7,
              "p_economía":47,
        }
        saveDiputado('piñeiro-garcia-lago', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1098,
              intervenciones: 1,
              palabras: 1036,
              "p_terrorismo":10,
              "p_economía":47,
        }
        saveDiputado('sanchez-amor', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1100,
              intervenciones: 1,
              palabras: 1092,
              "p_salud y sanidad":3,
        }
        saveDiputado('macias-i-aurau', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1106,
              intervenciones: 15,
              palabras: 990,
              "p_justicia":1,
              "p_educacion":40,
        }
        saveDiputado('letrada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1108,
              intervenciones: 1,
              palabras: 1056,
              "p_economía":47,
        }
        saveDiputado('capdevila-tatche', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1113,
              intervenciones: 3,
              palabras: 1088,
              "p_terrorismo":5,
              "p_vivienda":5,
        }
        saveDiputado('amador-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1123,
              intervenciones: 2,
              palabras: 967,
              "p_terrorismo":5,
              "p_economía":141,
        }
        saveDiputado('herrero-juan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1132,
              intervenciones: 3,
              palabras: 1117,
        }
        saveDiputado('cerrillos-morales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1134,
              intervenciones: 2,
              palabras: 1123,
              "p_infraestructuras":1,
        }
        saveDiputado('soto-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1138,
              intervenciones: 3,
              palabras: 988,
              "p_empleo":82,
              "p_terrorismo":5,
              "p_economía":47,
              "p_medioambiente":1,
        }
        saveDiputado('perez-de-los-cobos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1148,
              intervenciones: 2,
              palabras: 1128,
              "p_terrorismo":5,
              "p_educacion":5,
        }
        saveDiputado('orviz-orviz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1155,
              intervenciones: 21,
              palabras: 988,
              "p_terrorismo":5,
              "p_economía":47,
              "p_educacion":10,
        }
        saveDiputado('moral-reixach', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1172,
              intervenciones: 2,
              palabras: 1145,
              "p_terrorismo":15,
              "p_infraestructuras":2,
        }
        saveDiputado('fernandez-chillon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1174,
              intervenciones: 2,
              palabras: 1149,
              "p_terrorismo":15,
        }
        saveDiputado('valiente-ots', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1177,
              intervenciones: 3,
              palabras: 1151,
              "p_terrorismo":10,
              "p_medioambiente":1,
        }
        saveDiputado('sanchez-fornet', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1182,
              intervenciones: 2,
              palabras: 1164,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
        }
        saveDiputado('fernandez-iglesias', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1186,
              intervenciones: 1,
              palabras: 1175,
              "p_terrorismo":5,
              "p_infraestructuras":1,
        }
        saveDiputado('lasa-iturrioz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1189,
              intervenciones: 2,
              palabras: 1160,
              "p_terrorismo":15,
              "p_infraestructuras":4,
        }
        saveDiputado('pestaña-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1193,
              intervenciones: 1,
              palabras: 990,
              "p_terrorismo":10,
              "p_economía":188,
        }
        saveDiputado('aspiazu-uriarte', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1196,
              intervenciones: 2,
              palabras: 1175,
              "p_educacion":5,
              "p_infraestructuras":3,
              "p_salud y sanidad":3,
        }
        saveDiputado('roca-verard', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1200,
              intervenciones: 1,
              palabras: 1185,
              "p_educacion":10,
        }
        saveDiputado('orellana-muriana', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1219,
              intervenciones: 2,
              palabras: 1106,
              "p_infraestructuras":3,
              "p_educacion":100,
        }
        saveDiputado('aza-conejo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1220,
              intervenciones: 3,
              palabras: 1124,
              "p_terrorismo":25,
              "p_salud y sanidad":3,
              "p_economía":47,
              "p_educacion":5,
              "p_medioambiente":1,
        }
        saveDiputado('campo-piñeiro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1226,
              intervenciones: 3,
              palabras: 1195,
              "p_terrorismo":15,
              "p_infraestructuras":1,
        }
        saveDiputado('diez-de-baldeon-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1226,
              intervenciones: 3,
              palabras: 1198,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
              "p_medioambiente":5,
        }
        saveDiputado('garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1231,
              intervenciones: 2,
              palabras: 1206,
              "p_terrorismo":10,
              "p_vivienda":5,
        }
        saveDiputado('gonzalez-gallarza-morales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1234,
              intervenciones: 3,
              palabras: 1204,
              "p_terrorismo":15,
        }
        saveDiputado('casillas-illana', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1234,
              intervenciones: 2,
              palabras: 785,
              "p_terrorismo":15,
              "p_economía":423,
              "p_infraestructuras":1,
        }
        saveDiputado('pacheco-atienza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1234,
              intervenciones: 4,
              palabras: 1205,
              "p_infraestructuras":9,
        }
        saveDiputado('maron-beltran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1238,
              intervenciones: 9,
              palabras: 1180,
              "p_terrorismo":10,
              "p_salud y sanidad":3,
        }
        saveDiputado('almagro-castro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1249,
              intervenciones: 3,
              palabras: 1222,
              "p_infraestructuras":2,
              "p_terrorismo":10,
        }
        saveDiputado('martinez-gimeno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1255,
              intervenciones: 1,
              palabras: 1151,
              "p_terrorismo":5,
              "p_economía":94,
        }
        saveDiputado('menendez-de-luarca-navas-osorio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1265,
              intervenciones: 1,
              palabras: 1142,
              "p_empleo":82,
              "p_inseguridad":24,
              "p_terrorismo":10,
              "p_justicia":2,
        }
        saveDiputado('echave-de-pablos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1266,
              intervenciones: 4,
              palabras: 1038,
              "p_economía":188,
              "p_terrorismo":10,
              "p_infraestructuras":4,
              "p_educacion":5,
              "p_medioambiente":1,
        }
        saveDiputado('molas-marcelles', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1270,
              intervenciones: 2,
              palabras: 1252,
              "p_terrorismo":5,
              "p_infraestructuras":3,
        }
        saveDiputado('diaz-pines-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1272,
              intervenciones: 1,
              palabras: 1252,
              "p_terrorismo":5,
              "p_infraestructuras":10,
        }
        saveDiputado('alberola-ruiperez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1274,
              intervenciones: 2,
              palabras: 1263,
              "p_infraestructuras":1,
        }
        saveDiputado('bieger-morales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1295,
              intervenciones: 1,
              palabras: 1271,
              "p_terrorismo":5,
              "p_infraestructuras":14,
        }
        saveDiputado('viveros-gutierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1308,
              intervenciones: 1,
              palabras: 1136,
              "p_empleo":82,
              "p_inseguridad":8,
              "p_terrorismo":25,
              "p_clase politica":52,
        }
        saveDiputado('alcaraz-martos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1312,
              intervenciones: 2,
              palabras: 1042,
              "p_terrorismo":25,
              "p_economía":235,
        }
        saveDiputado('garcia-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1318,
              intervenciones: 2,
              palabras: 1302,
              "p_terrorismo":5,
              "p_justicia":1,
        }
        saveDiputado('monzon-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1328,
              intervenciones: 3,
              palabras: 1155,
              "p_economía":141,
              "p_pensiones":12,
              "p_terrorismo":5,
        }
        saveDiputado('almunia-amann', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1331,
              intervenciones: 4,
              palabras: 1258,
              "p_terrorismo":5,
              "p_infraestructuras":1,
              "p_economía":47,
        }
        saveDiputado('barranco-gallardo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1340,
              intervenciones: 1,
              palabras: 1333,
              "p_infraestructuras":2,
        }
        saveDiputado('morlan-gracia.', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1340,
              intervenciones: 4,
              palabras: 1233,
              "p_empleo":82,
              "p_terrorismo":5,
        }
        saveDiputado('calabia-pastor', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1364,
              intervenciones: 6,
              palabras: 1187,
              "p_economía":141,
              "p_justicia":1,
              "p_terrorismo":5,
        }
        saveDiputado('rodri­guez-zapatero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1367,
              intervenciones: 2,
              palabras: 1159,
              "p_economía":188,
              "p_educacion":10,
        }
        saveDiputado('sala-franco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1369,
              intervenciones: 1,
              palabras: 1348,
              "p_terrorismo":15,
              "p_justicia":1,
        }
        saveDiputado('martinez-de-pison-aparicio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1369,
              intervenciones: 2,
              palabras: 1359,
        }
        saveDiputado('sanchez-montenegro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1374,
              intervenciones: 2,
              palabras: 1342,
              "p_educacion":20,
              "p_justicia":2,
        }
        saveDiputado('de-asis-roig', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1419,
              intervenciones: 1,
              palabras: 1395,
              "p_terrorismo":15,
              "p_pensiones":3,
              "p_medioambiente":1,
        }
        saveDiputado('rodriguez-ranz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1425,
              intervenciones: 1,
              palabras: 1325,
              "p_terrorismo":5,
              "p_salud y sanidad":9,
              "p_economía":47,
              "p_inmigracion":24,
              "p_educacion":10,
        }
        saveDiputado('sanz-carrilo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1439,
              intervenciones: 1,
              palabras: 1426,
              "p_inseguridad":8,
        }
        saveDiputado('gonzalez-hermosilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1441,
              intervenciones: 2,
              palabras: 1420,
              "p_salud y sanidad":3,
              "p_terrorismo":5,
              "p_infraestructuras":1,
              "p_justicia":2,
        }
        saveDiputado('castro-girona', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1442,
              intervenciones: 7,
              palabras: 1361,
              "p_salud y sanidad":3,
              "p_terrorismo":20,
              "p_educacion":10,
              "p_justicia":1,
              "p_pensiones":12,
        }
        saveDiputado('meler-y-de-ugarte', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1452,
              intervenciones: 2,
              palabras: 1346,
              "p_empleo":82,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
              "p_educacion":5,
              "p_medioambiente":1,
        }
        saveDiputado('pereyra-echevarria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1456,
              intervenciones: 1,
              palabras: 1428,
              "p_terrorismo":5,
              "p_infraestructuras":15,
              "p_justicia":1,
              "p_medioambiente":2,
        }
        saveDiputado('de-sandoval-sarrias', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1457,
              intervenciones: 6,
              palabras: 1375,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('marquez-de-la-rubia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1457,
              intervenciones: 2,
              palabras: 1395,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('allue-sus', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1476,
              intervenciones: 3,
              palabras: 1450,
              "p_infraestructuras":1,
              "p_educacion":10,
        }
        saveDiputado('blanco-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1477,
              intervenciones: 2,
              palabras: 1450,
              "p_terrorismo":5,
              "p_medioambiente":8,
              "p_infraestructuras":4,
        }
        saveDiputado('touza-touza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1479,
              intervenciones: 1,
              palabras: 1413,
              "p_infraestructuras":14,
              "p_economía":47,
        }
        saveDiputado('anders-kjeldsen', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1480,
              intervenciones: 2,
              palabras: 1459,
              "p_salud y sanidad":6,
              "p_terrorismo":5,
        }
        saveDiputado('pelaez-narvaez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1482,
              intervenciones: 8,
              palabras: 1333,
              "p_terrorismo":15,
              "p_economía":94,
        }
        saveDiputado('pigem-palmes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1491,
              intervenciones: 1,
              palabras: 1339,
              "p_terrorismo":5,
              "p_economía":141,
              "p_justicia":1,
        }
        saveDiputado('monago-terraza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1492,
              intervenciones: 4,
              palabras: 1377,
              "p_terrorismo":15,
              "p_salud y sanidad":3,
              "p_economía":47,
              "p_educacion":30,
        }
        saveDiputado('collado-urieta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1493,
              intervenciones: 1,
              palabras: 1401,
              "p_empleo":82,
              "p_terrorismo":5,
        }
        saveDiputado('surrota-i-comas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1495,
              intervenciones: 2,
              palabras: 1485,
        }
        saveDiputado('torres-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1506,
              intervenciones: 1,
              palabras: 1462,
              "p_terrorismo":5,
              "p_infraestructuras":1,
              "p_salud y sanidad":33,
        }
        saveDiputado('jimenez-garcia-herrero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1508,
              intervenciones: 2,
              palabras: 1483,
              "p_terrorismo":5,
              "p_medioambiente":10,
        }
        saveDiputado('ojeda-gonzalez-posada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1530,
              intervenciones: 3,
              palabras: 1507,
              "p_terrorismo":5,
              "p_infraestructuras":2,
              "p_justicia":1,
        }
        saveDiputado('rubiales-bejar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1530,
              intervenciones: 1,
              palabras: 1509,
              "p_terrorismo":10,
              "p_justicia":6,
        }
        saveDiputado('comin-oliveres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1535,
              intervenciones: 28,
              palabras: 1380,
              "p_educacion":5,
              "p_terrorismo":10,
        }
        saveDiputado('garre-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1540,
              intervenciones: 2,
              palabras: 1466,
              "p_economía":47,
              "p_jueventud":2,
              "p_terrorismo":5,
              "p_educacion":10,
        }
        saveDiputado('portela-de-pablo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1548,
              intervenciones: 1,
              palabras: 1535,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
        }
        saveDiputado('marcos-aranda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1551,
              intervenciones: 9,
              palabras: 1330,
              "p_empleo":82,
              "p_economía":94,
        }
        saveDiputado('guerra-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1553,
              intervenciones: 8,
              palabras: 1408,
              "p_terrorismo":15,
              "p_justicia":3,
              "p_educacion":35,
              "p_clase politica":52,
        }
        saveDiputado('diaz-alabart', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1567,
              intervenciones: 1,
              palabras: 1511,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
              "p_economía":47,
        }
        saveDiputado('lopez-riesgo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1573,
              intervenciones: 1,
              palabras: 1093,
              "p_terrorismo":5,
              "p_economía":470,
        }
        saveDiputado('rodriguez-piñero-fenandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1574,
              intervenciones: 1,
              palabras: 1539,
              "p_terrorismo":30,
        }
        saveDiputado('manjon-gutierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1580,
              intervenciones: 1,
              palabras: 1428,
              "p_inseguridad":8,
              "p_terrorismo":45,
              "p_economía":94,
        }
        saveDiputado('zaragoza-lluch', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1595,
              intervenciones: 2,
              palabras: 1491,
              "p_terrorismo":45,
              "p_infraestructuras":1,
              "p_economía":47,
              "p_justicia":1,
        }
        saveDiputado('sanchez-guiu', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1601,
              intervenciones: 2,
              palabras: 1535,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
              "p_justicia":1,
              "p_economía":47,
        }
        saveDiputado('arrillaga-rejano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1602,
              intervenciones: 2,
              palabras: 1514,
              "p_terrorismo":25,
              "p_infraestructuras":2,
              "p_economía":47,
              "p_justicia":3,
              "p_medioambiente":1,
        }
        saveDiputado('sanchez-i-libre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1615,
              intervenciones: 3,
              palabras: 1574,
              "p_terrorismo":25,
              "p_medioambiente":1,
        }
        saveDiputado('fuentes-gago', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1616,
              intervenciones: 1,
              palabras: 1460,
              "p_empleo":82,
              "p_terrorismo":65,
              "p_justicia":4,
        }
        saveDiputado('portero-de-la-torre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1617,
              intervenciones: 2,
              palabras: 1565,
              "p_terrorismo":15,
              "p_clase politica":26,
              "p_justicia":1,
        }
        saveDiputado('boigues-noguera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1647,
              intervenciones: 3,
              palabras: 1621,
              "p_terrorismo":10,
              "p_infraestructuras":1,
        }
        saveDiputado('esteban-villamor', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1666,
              intervenciones: 2,
              palabras: 1599,
              "p_terrorismo":10,
              "p_economía":47,
        }
        saveDiputado('perez-hernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1674,
              intervenciones: 11,
              palabras: 1255,
              "p_economía":282,
              "p_empleo":82,
        }
        saveDiputado('posada-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1674,
              intervenciones: 1,
              palabras: 1612,
              "p_terrorismo":10,
              "p_economía":47,
        }
        saveDiputado('ruiz-canto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1675,
              intervenciones: 1,
              palabras: 1609,
              "p_inseguridad":8,
              "p_terrorismo":45,
              "p_infraestructuras":1,
              "p_justicia":7,
        }
        saveDiputado('grimaldi-gandia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1676,
              intervenciones: 3,
              palabras: 1594,
              "p_inseguridad":8,
              "p_economía":47,
              "p_jueventud":12,
        }
        saveDiputado('jimenez-arriero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1684,
              intervenciones: 1,
              palabras: 1611,
              "p_inseguridad":32,
              "p_terrorismo":25,
              "p_justicia":1,
              "p_educacion":10,
        }
        saveDiputado('pagazaurtundua-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1687,
              intervenciones: 4,
              palabras: 1611,
              "p_terrorismo":30,
              "p_clase politica":26,
        }
        saveDiputado('gonzalez-trevijano-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1694,
              intervenciones: 2,
              palabras: 1487,
              "p_terrorismo":5,
              "p_infraestructuras":4,
              "p_economía":188,
        }
        saveDiputado('barcelo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1698,
              intervenciones: 1,
              palabras: 1259,
              "p_terrorismo":10,
              "p_economía":423,
              "p_medioambiente":1,
        }
        saveDiputado('jorquela-caselas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1702,
              intervenciones: 2,
              palabras: 1489,
              "p_terrorismo":10,
              "p_economía":188,
              "p_educacion":5,
        }
        saveDiputado('manzanares-nuñez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1703,
              intervenciones: 2,
              palabras: 1693,
        }
        saveDiputado('de-muga-doria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1717,
              intervenciones: 4,
              palabras: 1575,
              "p_pensiones":18,
              "p_justicia":2,
              "p_educacion":5,
              "p_salud y sanidad":3,
              "p_economía":94,
        }
        saveDiputado('berenguer-comas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1730,
              intervenciones: 3,
              palabras: 1715,
        }
        saveDiputado('valero-artola', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1730,
              intervenciones: 3,
              palabras: 1572,
              "p_terrorismo":10,
              "p_infraestructuras":1,
              "p_economía":94,
              "p_pensiones":33,
              "p_educacion":5,
        }
        saveDiputado('jimenez-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1733,
              intervenciones: 2,
              palabras: 1718,
              "p_terrorismo":5,
        }
        saveDiputado('martinez-ramos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1734,
              intervenciones: 4,
              palabras: 1642,
              "p_terrorismo":25,
              "p_economía":47,
        }
        saveDiputado('lopez-aguilar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1742,
              intervenciones: 1,
              palabras: 1719,
              "p_infraestructuras":11,
              "p_salud y sanidad":6,
              "p_justicia":1,
        }
        saveDiputado('gonzalez-hernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1754,
              intervenciones: 4,
              palabras: 1449,
              "p_empleo":246,
              "p_pensiones":18,
              "p_educacion":20,
              "p_infraestructuras":1,
        }
        saveDiputado('molinas-sans', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1772,
              intervenciones: 2,
              palabras: 1747,
              "p_terrorismo":15,
        }
        saveDiputado('gutierrez-vicen', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1784,
              intervenciones: 2,
              palabras: 1774,
        }
        saveDiputado('ruiz-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1784,
              intervenciones: 3,
              palabras: 1388,
              "p_economía":376,
              "p_terrorismo":5,
        }
        saveDiputado('saeta-del-castillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1801,
              intervenciones: 1,
              palabras: 1691,
              "p_empleo":82,
              "p_terrorismo":20,
              "p_salud y sanidad":3,
        }
        saveDiputado('anton-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1807,
              intervenciones: 1,
              palabras: 1780,
              "p_medioambiente":22,
        }
        saveDiputado('vieites-baptista-de-sousa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1807,
              intervenciones: 1,
              palabras: 1693,
              "p_terrorismo":10,
              "p_salud y sanidad":3,
              "p_economía":94,
              "p_justicia":2,
        }
        saveDiputado('molina-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1818,
              intervenciones: 2,
              palabras: 1756,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('sanchez-jacob', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1822,
              intervenciones: 6,
              palabras: 1542,
              "p_economía":235,
              "p_educacion":10,
              "p_justicia":5,
        }
        saveDiputado('riera-reñe', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1838,
              intervenciones: 6,
              palabras: 1368,
              "p_empleo":164,
              "p_economía":235,
              "p_terrorismo":20,
              "p_pensiones":21,
        }
        saveDiputado('morano-masa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1842,
              intervenciones: 1,
              palabras: 1505,
              "p_terrorismo":5,
              "p_infraestructuras":2,
              "p_salud y sanidad":3,
              "p_vivienda":5,
              "p_economía":282,
              "p_pensiones":33,
              "p_jueventud":2,
        }
        saveDiputado('cugat-i-leseurs', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1844,
              intervenciones: 3,
              palabras: 1813,
              "p_terrorismo":15,
              "p_medioambiente":1,
        }
        saveDiputado('puy-fraga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1853,
              intervenciones: 1,
              palabras: 1740,
              "p_terrorismo":5,
              "p_salud y sanidad":9,
              "p_economía":94,
        }
        saveDiputado('fernandez-vara', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1859,
              intervenciones: 10,
              palabras: 1794,
              "p_terrorismo":15,
        }
        saveDiputado('bono-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1878,
              intervenciones: 2,
              palabras: 1770,
              "p_educacion":50,
              "p_medioambiente":1,
              "p_economía":47,
        }
        saveDiputado('gonzalez-i-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1885,
              intervenciones: 3,
              palabras: 1630,
              "p_terrorismo":5,
              "p_economía":235,
        }
        saveDiputado('alonso-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1898,
              intervenciones: 2,
              palabras: 1857,
              "p_terrorismo":10,
              "p_salud y sanidad":3,
              "p_medioambiente":18,
        }
        saveDiputado('jimenez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1899,
              intervenciones: 1,
              palabras: 1868,
              "p_infraestructuras":23,
              "p_salud y sanidad":3,
        }
        saveDiputado('carro-bilbao', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1900,
              intervenciones: 7,
              palabras: 1829,
              "p_salud y sanidad":6,
              "p_inseguridad":8,
              "p_terrorismo":20,
              "p_guerra":2,
        }
        saveDiputado('ciscar-casaban', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1905,
              intervenciones: 1,
              palabras: 1839,
              "p_terrorismo":5,
              "p_infraestructuras":8,
              "p_economía":47,
              "p_medioambiente":1,
        }
        saveDiputado('terminal-de-contenedores-de-barcelona', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1906,
              intervenciones: 1,
              palabras: 1900,
              "p_justicia":1,
        }
        saveDiputado('benito-celador', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1919,
              intervenciones: 1,
              palabras: 1848,
              "p_terrorismo":5,
              "p_infraestructuras":14,
              "p_economía":47,
        }
        saveDiputado('sanchez-simon-muñoz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1921,
              intervenciones: 2,
              palabras: 1741,
              "p_terrorismo":10,
              "p_economía":141,
              "p_pensiones":12,
              "p_educacion":5,
              "p_infraestructuras":2,
        }
        saveDiputado('vazquez-arias', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1925,
              intervenciones: 1,
              palabras: 1890,
              "p_terrorismo":5,
              "p_infraestructuras":25,
        }
        saveDiputado('valls-i-riera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1925,
              intervenciones: 3,
              palabras: 1899,
              "p_infraestructuras":1,
              "p_educacion":10,
        }
        saveDiputado('dueñas-herranz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1934,
              intervenciones: 2,
              palabras: 1881,
              "p_inseguridad":24,
              "p_salud y sanidad":6,
              "p_justicia":2,
              "p_terrorismo":5,
              "p_educacion":5,
              "p_medioambiente":1,
        }
        saveDiputado('soriano-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1936,
              intervenciones: 2,
              palabras: 1831,
              "p_empleo":82,
              "p_terrorismo":10,
              "p_infraestructuras":3,
        }
        saveDiputado('echave-gomez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1940,
              intervenciones: 2,
              palabras: 1905,
              "p_justicia":25,
        }
        saveDiputado('gimeno-jubero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1942,
              intervenciones: 2,
              palabras: 1914,
              "p_terrorismo":15,
              "p_salud y sanidad":3,
        }
        saveDiputado('recover-balboa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1947,
              intervenciones: 5,
              palabras: 1890,
              "p_infraestructuras":2,
              "p_pensiones":18,
              "p_justicia":5,
              "p_jueventud":2,
              "p_terrorismo":5,
        }
        saveDiputado('lobo-sastre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1960,
              intervenciones: 4,
              palabras: 1700,
              "p_terrorismo":5,
              "p_economía":235,
        }
        saveDiputado('blasco-de-bustos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1960,
              intervenciones: 6,
              palabras: 1799,
              "p_terrorismo":10,
              "p_economía":94,
              "p_guerra":1,
              "p_educacion":20,
              "p_justicia":6,
        }
        saveDiputado('lopez-villena', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1968,
              intervenciones: 3,
              palabras: 1536,
              "p_terrorismo":35,
              "p_economía":329,
              "p_salud y sanidad":3,
              "p_educacion":50,
        }
        saveDiputado('toquero-plaza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1970,
              intervenciones: 3,
              palabras: 1753,
              "p_economía":188,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
              "p_educacion":5,
              "p_terrorismo":5,
        }
        saveDiputado('hernandez-parra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1975,
              intervenciones: 2,
              palabras: 1876,
              "p_terrorismo":30,
              "p_economía":47,
              "p_inmigracion":12,
        }
        saveDiputado('abietar-rubio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1990,
              intervenciones: 2,
              palabras: 1972,
              "p_terrorismo":5,
              "p_salud y sanidad":3,
        }
        saveDiputado('tomas-navarro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1992,
              intervenciones: 2,
              palabras: 1938,
              "p_justicia":9,
              "p_educacion":25,
              "p_terrorismo":10,
        }
        saveDiputado('gomez-benitez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 1996,
              intervenciones: 2,
              palabras: 1866,
              "p_empleo":82,
              "p_terrorismo":30,
              "p_justicia":8,
        }
        saveDiputado('ojeda-aviles', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2002,
              intervenciones: 5,
              palabras: 1796,
              "p_terrorismo":15,
              "p_salud y sanidad":6,
              "p_economía":141,
              "p_pensiones":18,
              "p_justicia":1,
        }
        saveDiputado('martin-pindado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2005,
              intervenciones: 4,
              palabras: 1847,
              "p_empleo":82,
              "p_infraestructuras":2,
              "p_salud y sanidad":6,
              "p_economía":47,
              "p_justicia":1,
        }
        saveDiputado('aguirre-gil-de-biedma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2013,
              intervenciones: 2,
              palabras: 1847,
              "p_terrorismo":15,
              "p_economía":141,
        }
        saveDiputado('de-la-cavada-hoyo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2027,
              intervenciones: 2,
              palabras: 1975,
              "p_terrorismo":20,
              "p_justicia":22,
        }
        saveDiputado('gallardo-correa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2034,
              intervenciones: 1,
              palabras: 994,
              "p_economía":1034,
              "p_guerra":1,
        }
        saveDiputado('gomez--olive-casas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2037,
              intervenciones: 8,
              palabras: 1912,
              "p_terrorismo":35,
              "p_infraestructuras":3,
              "p_economía":47,
        }
        saveDiputado('acebes-paniagua', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2041,
              intervenciones: 2,
              palabras: 1998,
              "p_terrorismo":10,
              "p_infraestructuras":1,
              "p_medioambiente":22,
        }
        saveDiputado('santiago-burrutxaga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2044,
              intervenciones: 5,
              palabras: 1529,
              "p_terrorismo":15,
              "p_economía":470,
              "p_educacion":5,
        }
        saveDiputado('gomez-piña', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2058,
              intervenciones: 1,
              palabras: 2006,
              "p_economía":47,
        }
        saveDiputado('companys-sanfeliu', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2061,
              intervenciones: 3,
              palabras: 2041,
              "p_terrorismo":5,
        }
        saveDiputado('lopez-garcia-de-la-torre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2067,
              intervenciones: 3,
              palabras: 1937,
              "p_empleo":82,
              "p_pensiones":18,
              "p_educacion":15,
        }
        saveDiputado('requeijo-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2078,
              intervenciones: 2,
              palabras: 2058,
              "p_terrorismo":10,
        }
        saveDiputado('arnaldo-valdes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2079,
              intervenciones: 13,
              palabras: 1974,
              "p_educacion":5,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
              "p_terrorismo":5,
              "p_clase politica":26,
        }
        saveDiputado('perez-castell', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2085,
              intervenciones: 2,
              palabras: 2062,
              "p_terrorismo":10,
              "p_salud y sanidad":3,
        }
        saveDiputado('fuster-santaliestra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2096,
              intervenciones: 4,
              palabras: 2018,
              "p_terrorismo":10,
              "p_pensiones":45,
              "p_justicia":3,
        }
        saveDiputado('chicharro-muela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2105,
              intervenciones: 2,
              palabras: 2094,
              "p_justicia":1,
        }
        saveDiputado('sacha-michaud', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2111,
              intervenciones: 2,
              palabras: 1825,
              "p_terrorismo":15,
              "p_salud y sanidad":3,
              "p_economía":235,
              "p_pensiones":21,
              "p_justicia":2,
        }
        saveDiputado('valero-carreras', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2124,
              intervenciones: 2,
              palabras: 2076,
              "p_salud y sanidad":3,
              "p_educacion":15,
              "p_terrorismo":20,
        }
        saveDiputado('garcia-villar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2144,
              intervenciones: 3,
              palabras: 1953,
              "p_terrorismo":10,
              "p_economía":141,
              "p_educacion":25,
        }
        saveDiputado('martinez-paricio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2157,
              intervenciones: 19,
              palabras: 1832,
              "p_terrorismo":5,
              "p_economía":188,
              "p_salud y sanidad":27,
              "p_educacion":10,
        }
        saveDiputado('blanco-teran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2167,
              intervenciones: 2,
              palabras: 1880,
              "p_economía":188,
              "p_justicia":7,
              "p_empleo":82,
        }
        saveDiputado('sanchez-llibre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2180,
              intervenciones: 2,
              palabras: 1373,
              "p_empleo":738,
              "p_terrorismo":10,
              "p_economía":47,
              "p_infraestructuras":2,
        }
        saveDiputado('aranda-manzano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2193,
              intervenciones: 1,
              palabras: 2151,
              "p_terrorismo":10,
              "p_justicia":12,
              "p_educacion":15,
        }
        saveDiputado('chamorro-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2203,
              intervenciones: 4,
              palabras: 1924,
              "p_empleo":164,
              "p_infraestructuras":1,
              "p_economía":94,
        }
        saveDiputado('mezquida-prieto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2215,
              intervenciones: 2,
              palabras: 2133,
              "p_inmigracion":72,
        }
        saveDiputado('barbero-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2215,
              intervenciones: 2,
              palabras: 2181,
              "p_terrorismo":20,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
        }
        saveDiputado('ballestero-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2224,
              intervenciones: 3,
              palabras: 1926,
              "p_pensiones":21,
              "p_educacion":10,
              "p_terrorismo":15,
              "p_infraestructuras":1,
              "p_economía":235,
              "p_justicia":1,
        }
        saveDiputado('vicente-merino', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2232,
              intervenciones: 1,
              palabras: 2216,
              "p_terrorismo":10,
              "p_justicia":1,
        }
        saveDiputado('navarro-jimenez--asenjo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2235,
              intervenciones: 3,
              palabras: 2111,
              "p_economía":94,
              "p_terrorismo":5,
              "p_vivienda":10,
        }
        saveDiputado('garcia-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2246,
              intervenciones: 2,
              palabras: 2184,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('sastre-campo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2250,
              intervenciones: 1,
              palabras: 2181,
              "p_terrorismo":45,
              "p_pensiones":9,
              "p_educacion":10,
        }
        saveDiputado('vidal-ortiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2256,
              intervenciones: 3,
              palabras: 2085,
              "p_terrorismo":15,
              "p_economía":141,
        }
        saveDiputado('quintas-seoane', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2277,
              intervenciones: 5,
              palabras: 1563,
              "p_terrorismo":30,
              "p_economía":658,
              "p_infraestructuras":1,
        }
        saveDiputado('puerta-pascual', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2283,
              intervenciones: 2,
              palabras: 2169,
              "p_terrorismo":10,
              "p_economía":94,
        }
        saveDiputado('gatzagaetxebarria-bastida', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2300,
              intervenciones: 4,
              palabras: 1664,
              "p_infraestructuras":2,
              "p_economía":611,
              "p_justicia":2,
              "p_medioambiente":1,
        }
        saveDiputado('fernandez-i-iruela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2354,
              intervenciones: 4,
              palabras: 2219,
              "p_educacion":105,
              "p_terrorismo":10,
        }
        saveDiputado('roca-cobo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2395,
              intervenciones: 2,
              palabras: 2307,
              "p_inseguridad":8,
              "p_salud y sanidad":18,
              "p_terrorismo":5,
              "p_economía":47,
        }
        saveDiputado('gutierrez-muellades', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2398,
              intervenciones: 2,
              palabras: 2333,
              "p_terrorismo":20,
              "p_medioambiente":35,
        }
        saveDiputado('diaz-trillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2407,
              intervenciones: 2,
              palabras: 2189,
              "p_terrorismo":10,
              "p_vivienda":10,
              "p_economía":188,
        }
        saveDiputado('olle-bertran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2412,
              intervenciones: 2,
              palabras: 2037,
              "p_terrorismo":20,
              "p_infraestructuras":1,
              "p_vivienda":5,
              "p_economía":329,
              "p_educacion":10,
        }
        saveDiputado('arana-uli', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2417,
              intervenciones: 1,
              palabras: 2325,
              "p_terrorismo":40,
              "p_economía":47,
        }
        saveDiputado('gosalvez-lara', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2441,
              intervenciones: 1,
              palabras: 2404,
              "p_terrorismo":10,
              "p_infraestructuras":19,
              "p_salud y sanidad":3,
        }
        saveDiputado('balsera-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2444,
              intervenciones: 2,
              palabras: 2399,
              "p_terrorismo":20,
              "p_salud y sanidad":15,
        }
        saveDiputado('linares-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2451,
              intervenciones: 6,
              palabras: 2262,
              "p_infraestructuras":1,
              "p_justicia":2,
              "p_terrorismo":15,
              "p_economía":141,
        }
        saveDiputado('villar-garcia-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2453,
              intervenciones: 6,
              palabras: 2177,
              "p_terrorismo":5,
              "p_economía":235,
              "p_medioambiente":1,
              "p_educacion":5,
        }
        saveDiputado('garcia-sena', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2453,
              intervenciones: 2,
              palabras: 2318,
              "p_inseguridad":8,
              "p_terrorismo":15,
              "p_infraestructuras":1,
              "p_economía":94,
              "p_justicia":1,
              "p_educacion":5,
              "p_guerra":1,
        }
        saveDiputado('gisbert-caselli', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2468,
              intervenciones: 2,
              palabras: 2414,
              "p_jueventud":4,
              "p_educacion":35,
              "p_terrorismo":5,
        }
        saveDiputado('ruiz-mezcua', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2493,
              intervenciones: 2,
              palabras: 2391,
              "p_terrorismo":30,
              "p_medioambiente":62,
        }
        saveDiputado('tost-i-borras', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2498,
              intervenciones: 2,
              palabras: 2453,
              "p_terrorismo":30,
              "p_educacion":5,
        }
        saveDiputado('nuñez-villaverde', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2516,
              intervenciones: 3,
              palabras: 2410,
              "p_medioambiente":9,
              "p_empleo":82,
        }
        saveDiputado('perez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2555,
              intervenciones: 5,
              palabras: 2482,
              "p_salud y sanidad":15,
              "p_terrorismo":30,
              "p_medioambiente":3,
        }
        saveDiputado('aguirretxea-urresti', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2559,
              intervenciones: 2,
              palabras: 2513,
              "p_terrorismo":30,
              "p_infraestructuras":2,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
        }
        saveDiputado('diaz-montañes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2561,
              intervenciones: 8,
              palabras: 2458,
              "p_terrorismo":5,
              "p_infraestructuras":1,
              "p_economía":47,
              "p_educacion":10,
        }
        saveDiputado('torres-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2565,
              intervenciones: 1,
              palabras: 2376,
              "p_terrorismo":10,
              "p_infraestructuras":4,
              "p_economía":141,
              "p_pensiones":3,
              "p_clase politica":26,
        }
        saveDiputado('upta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2594,
              intervenciones: 1,
              palabras: 2476,
              "p_terrorismo":35,
              "p_salud y sanidad":42,
              "p_inmigracion":36,
        }
        saveDiputado('colomo-gomez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2604,
              intervenciones: 4,
              palabras: 1955,
              "p_economía":611,
              "p_terrorismo":15,
              "p_salud y sanidad":3,
        }
        saveDiputado('lopez-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2625,
              intervenciones: 3,
              palabras: 2541,
              "p_infraestructuras":11,
              "p_economía":47,
              "p_medioambiente":1,
              "p_terrorismo":10,
        }
        saveDiputado('ruiz-carbonell', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2635,
              intervenciones: 4,
              palabras: 2584,
              "p_terrorismo":30,
              "p_infraestructuras":1,
        }
        saveDiputado('malaret-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2648,
              intervenciones: 2,
              palabras: 2619,
              "p_salud y sanidad":3,
              "p_justicia":6,
              "p_educacion":5,
              "p_terrorismo":5,
        }
        saveDiputado('uria-etxebarria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2649,
              intervenciones: 2,
              palabras: 2496,
              "p_terrorismo":10,
              "p_salud y sanidad":18,
              "p_economía":94,
              "p_justicia":3,
              "p_jueventud":2,
              "p_educacion":15,
              "p_medioambiente":1,
        }
        saveDiputado('planchuelo-santos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2650,
              intervenciones: 2,
              palabras: 2638,
              "p_jueventud":2,
        }
        saveDiputado('domenech-i-tomas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2662,
              intervenciones: 3,
              palabras: 2584,
              "p_terrorismo":35,
              "p_justicia":13,
              "p_educacion":15,
        }
        saveDiputado('de-rosa-torner', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2667,
              intervenciones: 1,
              palabras: 1592,
              "p_economía":1034,
              "p_clase politica":26,
              "p_educacion":10,
        }
        saveDiputado('gomez-olive-casas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2671,
              intervenciones: 2,
              palabras: 2456,
              "p_infraestructuras":14,
              "p_economía":188,
              "p_medioambiente":3,
        }
        saveDiputado('gual-de-torrella', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2728,
              intervenciones: 5,
              palabras: 2659,
              "p_terrorismo":15,
              "p_violencia machista":4,
              "p_educacion":25,
        }
        saveDiputado('calvo-poyato', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2749,
              intervenciones: 2,
              palabras: 2542,
              "p_empleo":82,
              "p_terrorismo":15,
              "p_infraestructuras":1,
              "p_economía":94,
              "p_educacion":5,
        }
        saveDiputado('prieto-prieto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2754,
              intervenciones: 2,
              palabras: 2514,
              "p_terrorismo":40,
              "p_infraestructuras":2,
              "p_economía":188,
        }
        saveDiputado('riera-i-mestre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2755,
              intervenciones: 3,
              palabras: 2591,
              "p_terrorismo":10,
              "p_salud y sanidad":3,
              "p_economía":94,
              "p_pensiones":42,
        }
        saveDiputado('vidal-melia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2774,
              intervenciones: 2,
              palabras: 2725,
              "p_infraestructuras":29,
              "p_terrorismo":5,
              "p_educacion":5,
        }
        saveDiputado('romeu-marti', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2785,
              intervenciones: 2,
              palabras: 2730,
              "p_terrorismo":10,
              "p_educacion":10,
              "p_justicia":1,
              "p_inmigracion":24,
        }
        saveDiputado('santolaya-machetti', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2786,
              intervenciones: 2,
              palabras: 2673,
              "p_terrorismo":10,
              "p_infraestructuras":1,
              "p_salud y sanidad":45,
              "p_economía":47,
        }
        saveDiputado('rufino-san-jose', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2788,
              intervenciones: 2,
              palabras: 2297,
              "p_empleo":164,
              "p_terrorismo":25,
              "p_economía":282,
              "p_vivienda":10,
        }
        saveDiputado('vazquez-fraile', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2797,
              intervenciones: 3,
              palabras: 2627,
              "p_economía":141,
              "p_justicia":9,
              "p_terrorismo":5,
        }
        saveDiputado('san-julian-gomez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2829,
              intervenciones: 3,
              palabras: 2703,
              "p_medioambiente":2,
              "p_terrorismo":15,
              "p_economía":94,
        }
        saveDiputado('lagares-flores', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2841,
              intervenciones: 1,
              palabras: 2644,
              "p_empleo":164,
              "p_terrorismo":10,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
              "p_justicia":14,
        }
        saveDiputado('vila-torres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2851,
              intervenciones: 1,
              palabras: 2794,
              "p_terrorismo":35,
              "p_infraestructuras":15,
              "p_medioambiente":2,
        }
        saveDiputado('utor-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2868,
              intervenciones: 3,
              palabras: 2741,
              "p_terrorismo":5,
              "p_economía":94,
              "p_pensiones":6,
              "p_jueventud":2,
              "p_educacion":5,
        }
        saveDiputado('gallego-soto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2934,
              intervenciones: 1,
              palabras: 2829,
              "p_terrorismo":25,
              "p_infraestructuras":28,
              "p_economía":47,
        }
        saveDiputado('goya-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2937,
              intervenciones: 3,
              palabras: 2809,
              "p_infraestructuras":2,
              "p_salud y sanidad":27,
              "p_educacion":75,
              "p_terrorismo":5,
              "p_jueventud":4,
        }
        saveDiputado('ramirez-ribas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2947,
              intervenciones: 2,
              palabras: 2712,
              "p_salud y sanidad":6,
              "p_empleo":164,
              "p_terrorismo":55,
        }
        saveDiputado('jane-i-guash', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2974,
              intervenciones: 2,
              palabras: 2593,
              "p_educacion":10,
              "p_economía":329,
              "p_justicia":7,
              "p_inmigracion":24,
              "p_medioambiente":1,
        }
        saveDiputado('rafols-esteve', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2974,
              intervenciones: 11,
              palabras: 2855,
              "p_terrorismo":10,
              "p_salud y sanidad":39,
              "p_educacion":10,
              "p_guerra":4,
              "p_infraestructuras":1,
        }
        saveDiputado('chacon-i-piqueras', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2996,
              intervenciones: 2,
              palabras: 2964,
              "p_terrorismo":20,
              "p_jueventud":2,
        }
        saveDiputado('garcia-morales-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 2997,
              intervenciones: 2,
              palabras: 2708,
              "p_terrorismo":5,
              "p_infraestructuras":2,
              "p_salud y sanidad":12,
              "p_economía":235,
              "p_educacion":25,
        }
        saveDiputado('pinilla-dominguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3012,
              intervenciones: 5,
              palabras: 2540,
              "p_terrorismo":25,
              "p_justicia":15,
              "p_economía":282,
              "p_clase politica":104,
              "p_educacion":5,
              "p_pensiones":15,
              "p_medioambiente":1,
        }
        saveDiputado('caldera-sanchez-capitan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3070,
              intervenciones: 3,
              palabras: 2976,
              "p_terrorismo":10,
              "p_infraestructuras":5,
              "p_pensiones":39,
              "p_salud y sanidad":9,
              "p_justicia":2,
              "p_inmigracion":12,
              "p_jueventud":2,
        }
        saveDiputado('rabadan-fornies', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3077,
              intervenciones: 6,
              palabras: 2363,
              "p_terrorismo":45,
              "p_economía":611,
              "p_infraestructuras":1,
              "p_educacion":25,
              "p_justicia":2,
        }
        saveDiputado('lasalle-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3083,
              intervenciones: 2,
              palabras: 3026,
              "p_terrorismo":15,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
              "p_medioambiente":28,
        }
        saveDiputado('garat-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3084,
              intervenciones: 2,
              palabras: 2859,
              "p_terrorismo":45,
              "p_salud y sanidad":9,
              "p_vivienda":5,
              "p_economía":94,
              "p_justicia":4,
              "p_educacion":10,
              "p_inmigracion":48,
        }
        saveDiputado('verdes-lopez-dieguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3091,
              intervenciones: 2,
              palabras: 3006,
              "p_terrorismo":15,
              "p_infraestructuras":5,
              "p_vivienda":5,
              "p_economía":47,
              "p_justicia":1,
              "p_jueventud":2,
        }
        saveDiputado('llorenç-serrano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3161,
              intervenciones: 4,
              palabras: 2955,
              "p_empleo":82,
              "p_terrorismo":50,
              "p_economía":47,
              "p_pensiones":3,
              "p_justicia":4,
        }
        saveDiputado('gonzalez-villalba', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3173,
              intervenciones: 3,
              palabras: 3027,
              "p_terrorismo":15,
              "p_salud y sanidad":3,
              "p_justicia":21,
              "p_inmigracion":72,
              "p_educacion":20,
        }
        saveDiputado('bravo-sanestanislao', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3175,
              intervenciones: 6,
              palabras: 3067,
              "p_economía":47,
              "p_educacion":20,
              "p_terrorismo":10,
              "p_justicia":1,
        }
        saveDiputado('garcia-mahamut', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3183,
              intervenciones: 2,
              palabras: 2631,
              "p_terrorismo":25,
              "p_economía":517,
        }
        saveDiputado('pinyol-vidal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3185,
              intervenciones: 2,
              palabras: 2886,
              "p_empleo":82,
              "p_inseguridad":32,
              "p_terrorismo":25,
              "p_infraestructuras":9,
              "p_economía":141,
        }
        saveDiputado('montero-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3201,
              intervenciones: 6,
              palabras: 2362,
              "p_terrorismo":15,
              "p_economía":705,
              "p_justicia":2,
              "p_medioambiente":2,
              "p_salud y sanidad":3,
              "p_empleo":82,
        }
        saveDiputado('cortecero-montijano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3202,
              intervenciones: 1,
              palabras: 3020,
              "p_empleo":82,
              "p_terrorismo":20,
              "p_medioambiente":75,
        }
        saveDiputado('cabañas-varales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3215,
              intervenciones: 2,
              palabras: 3150,
              "p_terrorismo":5,
              "p_educacion":50,
        }
        saveDiputado('muñoz-medina', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3223,
              intervenciones: 3,
              palabras: 2802,
              "p_vivienda":30,
              "p_economía":376,
        }
        saveDiputado('galindo-cueva', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3239,
              intervenciones: 3,
              palabras: 3103,
              "p_justicia":12,
              "p_terrorismo":10,
              "p_economía":47,
              "p_clase politica":52,
        }
        saveDiputado('martinez-sampedro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3250,
              intervenciones: 6,
              palabras: 2854,
              "p_infraestructuras":2,
              "p_pensiones":81,
              "p_economía":282,
              "p_medioambiente":1,
        }
        saveDiputado('zubiri-oria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3289,
              intervenciones: 4,
              palabras: 3025,
              "p_empleo":164,
              "p_inseguridad":8,
              "p_terrorismo":5,
              "p_economía":47,
              "p_pensiones":15,
              "p_justicia":3,
              "p_jueventud":2,
        }
        saveDiputado('vicente-dura', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3302,
              intervenciones: 3,
              palabras: 3231,
              "p_inseguridad":32,
              "p_justicia":1,
              "p_infraestructuras":1,
              "p_educacion":5,
              "p_terrorismo":5,
              "p_inmigracion":12,
        }
        saveDiputado('lorente-acosta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3370,
              intervenciones: 6,
              palabras: 2434,
              "p_terrorismo":30,
              "p_economía":846,
              "p_justicia":4,
              "p_clase politica":26,
        }
        saveDiputado('beato-blanco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3387,
              intervenciones: 2,
              palabras: 3284,
              "p_terrorismo":10,
              "p_infraestructuras":1,
              "p_economía":47,
              "p_educacion":35,
        }
        saveDiputado('albert-de-leon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3412,
              intervenciones: 3,
              palabras: 3234,
              "p_pensiones":15,
              "p_infraestructuras":2,
              "p_economía":141,
              "p_justicia":5,
        }
        saveDiputado('holgado-pascual', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3454,
              intervenciones: 8,
              palabras: 3382,
              "p_salud y sanidad":15,
              "p_infraestructuras":4,
              "p_justicia":2,
              "p_terrorismo":5,
              "p_pensiones":6,
        }
        saveDiputado('cortajarena-iturrioz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3472,
              intervenciones: 9,
              palabras: 3267,
              "p_infraestructuras":1,
              "p_terrorismo":40,
              "p_educacion":50,
              "p_medioambiente":1,
              "p_salud y sanidad":6,
              "p_economía":47,
              "p_vivienda":15,
        }
        saveDiputado('perez-morales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3472,
              intervenciones: 7,
              palabras: 3262,
              "p_terrorismo":25,
              "p_salud y sanidad":12,
              "p_economía":94,
              "p_educacion":35,
              "p_inseguridad":8,
              "p_justicia":1,
        }
        saveDiputado('fernandez-capel-baños', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3483,
              intervenciones: 5,
              palabras: 3087,
              "p_terrorismo":25,
              "p_infraestructuras":1,
              "p_empleo":82,
              "p_clase politica":26,
              "p_economía":235,
              "p_justicia":2,
        }
        saveDiputado('pizarro-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3504,
              intervenciones: 2,
              palabras: 3462,
              "p_terrorismo":20,
              "p_justicia":2,
              "p_educacion":10,
        }
        saveDiputado('pascua-mateo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3512,
              intervenciones: 3,
              palabras: 3332,
              "p_terrorismo":40,
              "p_infraestructuras":31,
              "p_economía":94,
        }
        saveDiputado('salgueiro-carmona', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3523,
              intervenciones: 2,
              palabras: 3342,
              "p_terrorismo":20,
              "p_economía":94,
              "p_jueventud":2,
              "p_educacion":55,
        }
        saveDiputado('zugaza-miranda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3523,
              intervenciones: 3,
              palabras: 2387,
              "p_terrorismo":35,
              "p_economía":1081,
              "p_infraestructuras":3,
              "p_justicia":2,
        }
        saveDiputado('michavila-nuñez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3545,
              intervenciones: 4,
              palabras: 3415,
              "p_terrorismo":10,
              "p_guerra":6,
              "p_economía":94,
        }
        saveDiputado('aristegui-san-roman', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3556,
              intervenciones: 5,
              palabras: 3240,
              "p_infraestructuras":2,
              "p_economía":188,
              "p_pensiones":36,
              "p_inmigracion":24,
              "p_terrorismo":25,
              "p_salud y sanidad":6,
              "p_educacion":10,
        }
        saveDiputado('boada-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3578,
              intervenciones: 3,
              palabras: 3535,
              "p_terrorismo":20,
              "p_salud y sanidad":3,
              "p_vivienda":5,
        }
        saveDiputado('del-moral-ortega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3589,
              intervenciones: 2,
              palabras: 3521,
              "p_terrorismo":10,
              "p_economía":47,
              "p_medioambiente":1,
        }
        saveDiputado('torrente-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3602,
              intervenciones: 2,
              palabras: 3502,
              "p_terrorismo":20,
              "p_economía":47,
              "p_medioambiente":3,
              "p_educacion":20,
        }
        saveDiputado('pedreño-frutos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3651,
              intervenciones: 2,
              palabras: 3414,
              "p_terrorismo":25,
              "p_infraestructuras":2,
              "p_vivienda":5,
              "p_economía":188,
              "p_pensiones":6,
              "p_medioambiente":1,
        }
        saveDiputado('garcia-zabalza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3665,
              intervenciones: 2,
              palabras: 3534,
              "p_terrorismo":25,
              "p_economía":47,
              "p_inmigracion":48,
              "p_medioambiente":1,
        }
        saveDiputado('serrano-martin-de-vidales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3680,
              intervenciones: 12,
              palabras: 3312,
              "p_terrorismo":50,
              "p_infraestructuras":4,
              "p_salud y sanidad":3,
              "p_educacion":10,
              "p_economía":235,
              "p_justicia":5,
              "p_medioambiente":1,
        }
        saveDiputado('barreiro-alvarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3681,
              intervenciones: 6,
              palabras: 2920,
              "p_terrorismo":15,
              "p_infraestructuras":11,
              "p_economía":705,
        }
        saveDiputado('lema-devesa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3724,
              intervenciones: 16,
              palabras: 3604,
              "p_vivienda":5,
              "p_terrorismo":30,
              "p_educacion":5,
        }
        saveDiputado('canongia-gerona', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3730,
              intervenciones: 4,
              palabras: 3387,
              "p_terrorismo":70,
              "p_economía":235,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
              "p_pensiones":3,
              "p_justicia":1,
              "p_educacion":10,
        }
        saveDiputado('gomis-bernal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3768,
              intervenciones: 3,
              palabras: 3359,
              "p_terrorismo":10,
              "p_infraestructuras":6,
              "p_salud y sanidad":6,
              "p_economía":329,
              "p_pensiones":36,
              "p_jueventud":2,
              "p_educacion":5,
        }
        saveDiputado('lagares-calvo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3782,
              intervenciones: 3,
              palabras: 3727,
              "p_terrorismo":20,
              "p_infraestructuras":7,
              "p_justicia":1,
              "p_educacion":10,
              "p_jueventud":2,
        }
        saveDiputado('maestre-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3792,
              intervenciones: 3,
              palabras: 2983,
              "p_empleo":82,
              "p_terrorismo":15,
              "p_infraestructuras":7,
              "p_economía":658,
              "p_pensiones":6,
              "p_clase politica":26,
        }
        saveDiputado('burgos-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3798,
              intervenciones: 3,
              palabras: 3573,
              "p_terrorismo":65,
              "p_infraestructuras":1,
              "p_economía":141,
              "p_guerra":3,
        }
        saveDiputado('yañez-barnuevo-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3803,
              intervenciones: 2,
              palabras: 3614,
              "p_terrorismo":30,
              "p_salud y sanidad":3,
              "p_economía":141,
              "p_educacion":5,
        }
        saveDiputado('junquera-temprano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3855,
              intervenciones: 11,
              palabras: 3701,
              "p_terrorismo":30,
              "p_infraestructuras":5,
              "p_salud y sanidad":6,
              "p_clase politica":26,
              "p_educacion":10,
              "p_medioambiente":1,
              "p_inseguridad":16,
              "p_vivienda":5,
        }
        saveDiputado('ramirez-del-molino-moran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3887,
              intervenciones: 6,
              palabras: 3583,
              "p_terrorismo":20,
              "p_vivienda":10,
              "p_economía":235,
              "p_justicia":2,
              "p_educacion":5,
              "p_medioambiente":1,
              "p_infraestructuras":1,
        }
        saveDiputado('macias-arau', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3894,
              intervenciones: 2,
              palabras: 3786,
              "p_inseguridad":16,
              "p_terrorismo":10,
              "p_infraestructuras":14,
              "p_salud y sanidad":6,
              "p_economía":47,
              "p_justicia":5,
        }
        saveDiputado('juarez-melendez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3915,
              intervenciones: 2,
              palabras: 2979,
              "p_empleo":82,
              "p_terrorismo":45,
              "p_economía":799,
        }
        saveDiputado('martin-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3937,
              intervenciones: 6,
              palabras: 3795,
              "p_terrorismo":30,
              "p_empleo":82,
        }
        saveDiputado('doña-maricela-daniel', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3948,
              intervenciones: 2,
              palabras: 3819,
              "p_terrorismo":25,
              "p_economía":94,
        }
        saveDiputado('rodriguez-illera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3958,
              intervenciones: 2,
              palabras: 3856,
              "p_infraestructuras":8,
              "p_medioambiente":2,
              "p_terrorismo":65,
              "p_salud y sanidad":6,
              "p_justicia":1,
              "p_educacion":10,
        }
        saveDiputado('hernandez-oñate', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 3997,
              intervenciones: 3,
              palabras: 3558,
              "p_terrorismo":30,
              "p_salud y sanidad":114,
              "p_economía":94,
              "p_justicia":1,
              "p_educacion":185,
        }
        saveDiputado('navas-palacios', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4003,
              intervenciones: 2,
              palabras: 3982,
              "p_salud y sanidad":6,
              "p_terrorismo":5,
        }
        saveDiputado('medina', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4009,
              intervenciones: 15,
              palabras: 3709,
              "p_justicia":3,
              "p_terrorismo":25,
              "p_salud y sanidad":3,
              "p_infraestructuras":6,
              "p_economía":188,
        }
        saveDiputado('astarloa-huarte-mendicoa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4011,
              intervenciones: 5,
              palabras: 3304,
              "p_terrorismo":30,
              "p_salud y sanidad":3,
              "p_economía":564,
              "p_medioambiente":1,
              "p_empleo":82,
              "p_infraestructuras":1,
              "p_justicia":1,
        }
        saveDiputado('martinez-sanjuan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4023,
              intervenciones: 6,
              palabras: 3529,
              "p_empleo":246,
              "p_terrorismo":5,
              "p_economía":188,
              "p_inmigracion":24,
              "p_infraestructuras":1,
        }
        saveDiputado('aparicio-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4043,
              intervenciones: 10,
              palabras: 3862,
              "p_terrorismo":50,
              "p_infraestructuras":34,
              "p_economía":47,
        }
        saveDiputado('palao-taboada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4051,
              intervenciones: 5,
              palabras: 3904,
              "p_salud y sanidad":18,
              "p_educacion":30,
              "p_terrorismo":25,
              "p_economía":47,
              "p_infraestructuras":2,
        }
        saveDiputado('rodriguez-barahona', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4071,
              intervenciones: 3,
              palabras: 3397,
              "p_terrorismo":20,
              "p_infraestructuras":25,
              "p_salud y sanidad":3,
              "p_economía":611,
        }
        saveDiputado('marin-san-andres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4073,
              intervenciones: 6,
              palabras: 3950,
              "p_guerra":6,
              "p_terrorismo":30,
              "p_economía":47,
              "p_educacion":10,
        }
        saveDiputado('soravilla-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4150,
              intervenciones: 9,
              palabras: 3814,
              "p_medioambiente":6,
              "p_infraestructuras":17,
              "p_educacion":5,
              "p_terrorismo":25,
              "p_salud y sanidad":3,
              "p_economía":235,
        }
        saveDiputado('lizarraga-gisbert', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4190,
              intervenciones: 2,
              palabras: 4001,
              "p_terrorismo":65,
              "p_salud y sanidad":9,
              "p_infraestructuras":5,
              "p_economía":94,
              "p_justicia":1,
              "p_educacion":5,
        }
        saveDiputado('mugica-herzog', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4192,
              intervenciones: 6,
              palabras: 4081,
              "p_terrorismo":30,
              "p_economía":47,
              "p_pensiones":3,
              "p_guerra":1,
        }
        saveDiputado('peña-pinto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4296,
              intervenciones: 6,
              palabras: 4146,
              "p_economía":94,
              "p_terrorismo":15,
              "p_justicia":1,
              "p_educacion":10,
        }
        saveDiputado('ramos-torre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4320,
              intervenciones: 9,
              palabras: 3830,
              "p_empleo":246,
              "p_terrorismo":25,
              "p_salud y sanidad":3,
              "p_educacion":30,
              "p_economía":141,
        }
        saveDiputado('oliart-saussol', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4331,
              intervenciones: 9,
              palabras: 4127,
              "p_educacion":15,
              "p_terrorismo":30,
              "p_medioambiente":3,
              "p_inseguridad":24,
              "p_justicia":3,
              "p_empleo":82,
              "p_jueventud":2,
        }
        saveDiputado('buen-lacambra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4340,
              intervenciones: 11,
              palabras: 3371,
              "p_terrorismo":60,
              "p_salud y sanidad":6,
              "p_economía":846,
              "p_jueventud":2,
        }
        saveDiputado('arola-blanquet', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4340,
              intervenciones: 14,
              palabras: 4171,
              "p_terrorismo":50,
              "p_medioambiente":1,
              "p_infraestructuras":1,
              "p_economía":47,
        }
        saveDiputado('menendez-de-luarca-navia-osorio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4342,
              intervenciones: 6,
              palabras: 3577,
              "p_vivienda":30,
              "p_economía":705,
        }
        saveDiputado('martinez-estevez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4394,
              intervenciones: 4,
              palabras: 3130,
              "p_terrorismo":15,
              "p_infraestructuras":7,
              "p_economía":1222,
        }
        saveDiputado('serrano-beltran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4438,
              intervenciones: 2,
              palabras: 3643,
              "p_empleo":82,
              "p_terrorismo":40,
              "p_economía":564,
              "p_clase politica":26,
              "p_justicia":3,
              "p_inmigracion":48,
              "p_medioambiente":1,
              "p_infraestructuras":1,
              "p_educacion":20,
        }
        saveDiputado('lopez-bermejo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4446,
              intervenciones: 2,
              palabras: 3917,
              "p_terrorismo":35,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
              "p_economía":470,
              "p_educacion":10,
        }
        saveDiputado('gaiteiro-fortes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4499,
              intervenciones: 3,
              palabras: 4142,
              "p_terrorismo":25,
              "p_economía":235,
              "p_empleo":82,
        }
        saveDiputado('izquierdo-llanes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4525,
              intervenciones: 3,
              palabras: 3795,
              "p_economía":611,
              "p_pensiones":69,
              "p_terrorismo":10,
              "p_infraestructuras":1,
              "p_inmigracion":24,
        }
        saveDiputado('herce-san-miguel', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4573,
              intervenciones: 10,
              palabras: 4406,
              "p_terrorismo":20,
              "p_pensiones":3,
              "p_economía":94,
        }
        saveDiputado('cuevas-delgado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4586,
              intervenciones: 6,
              palabras: 3582,
              "p_economía":940,
              "p_terrorismo":15,
              "p_justicia":2,
              "p_inmigracion":12,
              "p_educacion":5,
        }
        saveDiputado('barreiro-perez-pardo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4666,
              intervenciones: 2,
              palabras: 4051,
              "p_terrorismo":30,
              "p_infraestructuras":3,
              "p_salud y sanidad":6,
              "p_economía":564,
              "p_jueventud":2,
        }
        saveDiputado('benedicto-iruiñ', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4672,
              intervenciones: 44,
              palabras: 3294,
              "p_terrorismo":30,
              "p_empleo":328,
              "p_economía":799,
              "p_justicia":1,
        }
        saveDiputado('pedrosa-roldan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4762,
              intervenciones: 19,
              palabras: 4617,
              "p_justicia":4,
              "p_infraestructuras":1,
              "p_terrorismo":25,
              "p_pensiones":15,
              "p_vivienda":5,
        }
        saveDiputado('barrero-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4787,
              intervenciones: 3,
              palabras: 4711,
              "p_terrorismo":35,
              "p_justicia":26,
        }
        saveDiputado('sexmero-iglesias', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4810,
              intervenciones: 3,
              palabras: 3799,
              "p_terrorismo":110,
              "p_infraestructuras":1,
              "p_economía":846,
              "p_justicia":1,
              "p_educacion":35,
              "p_pensiones":3,
        }
        saveDiputado('restoy-lozano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4916,
              intervenciones: 1,
              palabras: 4274,
              "p_terrorismo":30,
              "p_vivienda":85,
              "p_economía":517,
              "p_justicia":5,
        }
        saveDiputado('olangua-femandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4918,
              intervenciones: 2,
              palabras: 4835,
              "p_terrorismo":25,
              "p_economía":47,
              "p_infraestructuras":1,
        }
        saveDiputado('gonzalez-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4929,
              intervenciones: 3,
              palabras: 4791,
              "p_terrorismo":20,
              "p_infraestructuras":3,
              "p_economía":94,
              "p_justicia":1,
              "p_educacion":5,
        }
        saveDiputado('marset-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4945,
              intervenciones: 3,
              palabras: 4311,
              "p_terrorismo":190,
              "p_economía":423,
              "p_guerra":1,
              "p_educacion":5,
        }
        saveDiputado('laiglesia-y-gonzalez-de-peredo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4950,
              intervenciones: 9,
              palabras: 4739,
              "p_infraestructuras":15,
              "p_economía":141,
              "p_terrorismo":10,
        }
        saveDiputado('louro-goyanes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 4997,
              intervenciones: 3,
              palabras: 4628,
              "p_terrorismo":30,
              "p_infraestructuras":11,
              "p_pensiones":57,
              "p_justicia":6,
              "p_salud y sanidad":15,
              "p_economía":235,
        }
        saveDiputado('muñoz-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5077,
              intervenciones: 8,
              palabras: 4181,
              "p_terrorismo":10,
              "p_economía":846,
        }
        saveDiputado('conde-roa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5136,
              intervenciones: 9,
              palabras: 4889,
              "p_salud y sanidad":27,
              "p_educacion":10,
              "p_terrorismo":20,
              "p_economía":141,
              "p_infraestructuras":1,
              "p_pensiones":3,
        }
        saveDiputado('cediel-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5150,
              intervenciones: 3,
              palabras: 4980,
              "p_educacion":45,
              "p_terrorismo":15,
              "p_infraestructuras":1,
              "p_economía":94,
        }
        saveDiputado('palomero-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5173,
              intervenciones: 5,
              palabras: 4865,
              "p_terrorismo":95,
              "p_infraestructuras":6,
              "p_economía":94,
              "p_empleo":82,
              "p_pensiones":6,
        }
        saveDiputado('rodriguez-alfageme', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5247,
              intervenciones: 2,
              palabras: 4479,
              "p_empleo":164,
              "p_terrorismo":20,
              "p_infraestructuras":3,
              "p_salud y sanidad":3,
              "p_economía":564,
              "p_justicia":3,
              "p_medioambiente":1,
        }
        saveDiputado('matutes-juan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5319,
              intervenciones: 20,
              palabras: 5120,
              "p_terrorismo":50,
              "p_justicia":17,
              "p_educacion":5,
              "p_salud y sanidad":3,
              "p_vivienda":5,
              "p_medioambiente":3,
              "p_inseguridad":16,
        }
        saveDiputado('moragas-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5338,
              intervenciones: 10,
              palabras: 4469,
              "p_terrorismo":60,
              "p_salud y sanidad":87,
              "p_economía":658,
              "p_justicia":4,
              "p_educacion":10,
        }
        saveDiputado('castro-dominguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5382,
              intervenciones: 14,
              palabras: 5038,
              "p_terrorismo":35,
              "p_economía":188,
              "p_infraestructuras":1,
              "p_educacion":50,
        }
        saveDiputado('don-miguel', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5384,
              intervenciones: 6,
              palabras: 4854,
              "p_terrorismo":35,
              "p_medioambiente":4,
              "p_empleo":82,
              "p_economía":376,
              "p_justicia":3,
        }
        saveDiputado('arias-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5413,
              intervenciones: 4,
              palabras: 4896,
              "p_terrorismo":15,
              "p_infraestructuras":2,
              "p_pensiones":57,
              "p_economía":423,
        }
        saveDiputado('fernandez-toxo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5428,
              intervenciones: 10,
              palabras: 5309,
              "p_terrorismo":15,
              "p_drogas":4,
              "p_economía":47,
              "p_salud y sanidad":3,
        }
        saveDiputado('pintado-barbanoj', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5457,
              intervenciones: 3,
              palabras: 3703,
              "p_terrorismo":20,
              "p_economía":1692,
              "p_pensiones":18,
              "p_educacion":5,
              "p_salud y sanidad":3,
              "p_infraestructuras":1,
        }
        saveDiputado('iranzo-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5462,
              intervenciones: 2,
              palabras: 5197,
              "p_terrorismo":50,
              "p_infraestructuras":9,
              "p_economía":188,
              "p_justicia":1,
              "p_medioambiente":1,
              "p_salud y sanidad":6,
        }
        saveDiputado('gallego-nadal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5492,
              intervenciones: 4,
              palabras: 4161,
              "p_economía":893,
              "p_clase politica":26,
              "p_justicia":3,
              "p_empleo":246,
              "p_terrorismo":30,
              "p_infraestructuras":2,
              "p_salud y sanidad":3,
              "p_pensiones":30,
              "p_educacion":20,
              "p_vivienda":10,
              "p_inmigracion":48,
        }
        saveDiputado('lopez-casasnovas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5508,
              intervenciones: 17,
              palabras: 4902,
              "p_terrorismo":55,
              "p_infraestructuras":8,
              "p_economía":376,
              "p_empleo":82,
        }
        saveDiputado('fernandez-rozada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5526,
              intervenciones: 3,
              palabras: 4642,
              "p_empleo":492,
              "p_educacion":20,
              "p_terrorismo":45,
              "p_economía":282,
              "p_justicia":1,
              "p_jueventud":24,
              "p_vivienda":5,
        }
        saveDiputado('alconchel-morales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5530,
              intervenciones: 13,
              palabras: 5239,
              "p_terrorismo":70,
              "p_infraestructuras":14,
              "p_economía":141,
              "p_medioambiente":1,
        }
        saveDiputado('cachafeiro-vila', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5547,
              intervenciones: 3,
              palabras: 5058,
              "p_terrorismo":25,
              "p_economía":329,
              "p_pensiones":27,
              "p_empleo":82,
              "p_justicia":2,
              "p_jueventud":4,
              "p_educacion":5,
        }
        saveDiputado('monereo-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5569,
              intervenciones: 3,
              palabras: 4858,
              "p_terrorismo":60,
              "p_economía":470,
              "p_educacion":150,
              "p_infraestructuras":1,
              "p_salud y sanidad":15,
        }
        saveDiputado('rubiralta-y-alcañiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5590,
              intervenciones: 1,
              palabras: 5413,
              "p_terrorismo":15,
              "p_infraestructuras":1,
              "p_vivienda":60,
              "p_economía":94,
              "p_justicia":2,
        }
        saveDiputado('olangua-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5604,
              intervenciones: 20,
              palabras: 4989,
              "p_justicia":1,
              "p_empleo":82,
              "p_terrorismo":40,
              "p_infraestructuras":3,
              "p_inmigracion":60,
              "p_economía":329,
        }
        saveDiputado('herrera-gil', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5614,
              intervenciones: 6,
              palabras: 5331,
              "p_terrorismo":45,
              "p_salud y sanidad":6,
              "p_vivienda":10,
              "p_economía":188,
              "p_infraestructuras":4,
        }
        saveDiputado('cabrera-noda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5633,
              intervenciones: 9,
              palabras: 4951,
              "p_economía":611,
              "p_justicia":2,
              "p_terrorismo":20,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
        }
        saveDiputado('pozuelo-meño', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5682,
              intervenciones: 8,
              palabras: 4676,
              "p_infraestructuras":12,
              "p_justicia":6,
              "p_terrorismo":10,
              "p_empleo":738,
              "p_economía":188,
              "p_pensiones":12,
        }
        saveDiputado('ponce-anguita', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5687,
              intervenciones: 9,
              palabras: 5497,
              "p_empleo":82,
              "p_terrorismo":10,
              "p_salud y sanidad":3,
              "p_economía":47,
              "p_infraestructuras":3,
        }
        saveDiputado('gonzalez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5693,
              intervenciones: 7,
              palabras: 5290,
              "p_terrorismo":55,
              "p_economía":282,
              "p_infraestructuras":26,
              "p_educacion":5,
        }
        saveDiputado('vivanco-bustos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5777,
              intervenciones: 14,
              palabras: 5030,
              "p_economía":376,
              "p_educacion":110,
              "p_terrorismo":80,
              "p_infraestructuras":2,
              "p_salud y sanidad":3,
              "p_empleo":82,
              "p_pensiones":24,
        }
        saveDiputado('costa-palacios', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5838,
              intervenciones: 2,
              palabras: 5750,
              "p_inseguridad":8,
              "p_terrorismo":20,
              "p_economía":47,
              "p_jueventud":2,
              "p_medioambiente":1,
        }
        saveDiputado('del-corral-beltran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5852,
              intervenciones: 1,
              palabras: 5755,
              "p_terrorismo":35,
              "p_infraestructuras":1,
              "p_justicia":46,
              "p_educacion":10,
        }
        saveDiputado('apm', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 5906,
              intervenciones: 4,
              palabras: 5069,
              "p_terrorismo":35,
              "p_economía":658,
              "p_medioambiente":1,
              "p_empleo":82,
              "p_infraestructuras":2,
              "p_pensiones":33,
              "p_justicia":1,
              "p_salud y sanidad":3,
              "p_jueventud":2,
        }
        saveDiputado('vilar-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6023,
              intervenciones: 12,
              palabras: 5845,
              "p_terrorismo":15,
              "p_justicia":3,
              "p_economía":94,
              "p_salud y sanidad":6,
        }
        saveDiputado('cuesta-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6040,
              intervenciones: 23,
              palabras: 5886,
              "p_terrorismo":35,
              "p_medioambiente":1,
              "p_guerra":3,
        }
        saveDiputado('suarez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6047,
              intervenciones: 5,
              palabras: 4812,
              "p_terrorismo":55,
              "p_infraestructuras":1,
              "p_economía":1128,
              "p_educacion":20,
              "p_vivienda":5,
              "p_justicia":1,
        }
        saveDiputado('hidalgo-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6049,
              intervenciones: 8,
              palabras: 5484,
              "p_salud y sanidad":9,
              "p_terrorismo":50,
              "p_economía":423,
              "p_justicia":3,
              "p_educacion":40,
        }
        saveDiputado('hermosin-bono', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6246,
              intervenciones: 9,
              palabras: 5307,
              "p_terrorismo":130,
              "p_economía":752,
              "p_medioambiente":6,
              "p_salud y sanidad":6,
        }
        saveDiputado('ferrando-sendra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6288,
              intervenciones: 8,
              palabras: 6050,
              "p_salud y sanidad":6,
              "p_vivienda":5,
              "p_economía":141,
              "p_terrorismo":40,
              "p_educacion":5,
              "p_medioambiente":1,
        }
        saveDiputado('martin-pere', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6308,
              intervenciones: 3,
              palabras: 5660,
              "p_terrorismo":150,
              "p_salud y sanidad":12,
              "p_economía":470,
              "p_medioambiente":1,
        }
        saveDiputado('lorenzo-almendros', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6315,
              intervenciones: 8,
              palabras: 5816,
              "p_infraestructuras":7,
              "p_terrorismo":50,
              "p_economía":376,
              "p_salud y sanidad":18,
              "p_inseguridad":8,
        }
        saveDiputado('gasco-gonzalo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6361,
              intervenciones: 2,
              palabras: 6177,
              "p_empleo":82,
              "p_terrorismo":25,
              "p_infraestructuras":3,
              "p_economía":47,
              "p_justicia":1,
              "p_medioambiente":1,
              "p_educacion":15,
        }
        saveDiputado('guardans-cambo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6365,
              intervenciones: 5,
              palabras: 5832,
              "p_terrorismo":30,
              "p_economía":470,
              "p_pensiones":3,
              "p_justicia":2,
              "p_medioambiente":3,
        }
        saveDiputado('lazaro-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6387,
              intervenciones: 5,
              palabras: 5238,
              "p_infraestructuras":47,
              "p_economía":1034,
              "p_terrorismo":35,
              "p_educacion":5,
              "p_medioambiente":1,
              "p_justicia":2,
        }
        saveDiputado('gonzalez-laxe', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6401,
              intervenciones: 17,
              palabras: 5515,
              "p_infraestructuras":5,
              "p_educacion":10,
              "p_empleo":246,
              "p_terrorismo":20,
              "p_pensiones":3,
              "p_economía":517,
        }
        saveDiputado('lopez-amor-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6409,
              intervenciones: 4,
              palabras: 4833,
              "p_terrorismo":5,
              "p_economía":1363,
              "p_pensiones":114,
              "p_inmigracion":72,
              "p_jueventud":2,
        }
        saveDiputado('jimenez-ridruejo-ayuso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6413,
              intervenciones: 16,
              palabras: 5845,
              "p_empleo":164,
              "p_terrorismo":150,
              "p_economía":141,
              "p_inseguridad":32,
              "p_justicia":1,
        }
        saveDiputado('alvarez-de-toledo-peralta-ramos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6493,
              intervenciones: 10,
              palabras: 5932,
              "p_empleo":82,
              "p_terrorismo":85,
              "p_infraestructuras":4,
              "p_salud y sanidad":3,
              "p_vivienda":5,
              "p_economía":329,
              "p_justicia":2,
              "p_medioambiente":1,
        }
        saveDiputado('abalos-meco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6507,
              intervenciones: 6,
              palabras: 6140,
              "p_pensiones":78,
              "p_terrorismo":5,
              "p_infraestructuras":4,
              "p_salud y sanidad":3,
              "p_economía":235,
              "p_justicia":12,
        }
        saveDiputado('gonzalez-de-frutos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6543,
              intervenciones: 15,
              palabras: 6311,
              "p_inseguridad":8,
              "p_terrorismo":15,
              "p_vivienda":5,
              "p_guerra":26,
              "p_justicia":7,
              "p_jueventud":6,
              "p_educacion":40,
              "p_salud y sanidad":3,
              "p_economía":47,
        }
        saveDiputado('grau-reines', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6584,
              intervenciones: 14,
              palabras: 6376,
              "p_infraestructuras":9,
              "p_terrorismo":70,
              "p_economía":47,
              "p_jueventud":2,
              "p_educacion":10,
        }
        saveDiputado('maldonado-fernandez-de-tejada', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6612,
              intervenciones: 4,
              palabras: 5888,
              "p_terrorismo":20,
              "p_infraestructuras":2,
              "p_salud y sanidad":15,
              "p_economía":423,
              "p_pensiones":57,
              "p_justicia":6,
              "p_jueventud":2,
              "p_educacion":10,
              "p_empleo":164,
              "p_vivienda":5,
        }
        saveDiputado('verges-mollet', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6648,
              intervenciones: 9,
              palabras: 6289,
              "p_infraestructuras":4,
              "p_salud y sanidad":9,
              "p_economía":235,
              "p_educacion":20,
              "p_terrorismo":40,
              "p_justicia":1,
              "p_vivienda":5,
        }
        saveDiputado('garcia-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6716,
              intervenciones: 5,
              palabras: 5505,
              "p_empleo":82,
              "p_terrorismo":20,
              "p_infraestructuras":7,
              "p_economía":893,
              "p_pensiones":150,
              "p_justicia":4,
              "p_salud y sanidad":6,
              "p_inmigracion":24,
        }
        saveDiputado('mendez-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6867,
              intervenciones: 14,
              palabras: 6312,
              "p_infraestructuras":3,
              "p_economía":329,
              "p_terrorismo":40,
              "p_justicia":1,
              "p_empleo":82,
              "p_educacion":30,
        }
        saveDiputado('gonzalez-sinde', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6876,
              intervenciones: 14,
              palabras: 6456,
              "p_infraestructuras":1,
              "p_salud y sanidad":21,
              "p_economía":141,
              "p_empleo":82,
              "p_terrorismo":55,
              "p_pensiones":24,
              "p_educacion":20,
              "p_guerra":6,
        }
        saveDiputado('gamez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6910,
              intervenciones: 4,
              palabras: 6272,
              "p_terrorismo":85,
              "p_infraestructuras":2,
              "p_economía":282,
              "p_pensiones":3,
              "p_empleo":246,
        }
        saveDiputado('ferrer-sais', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6922,
              intervenciones: 18,
              palabras: 6340,
              "p_terrorismo":65,
              "p_economía":423,
              "p_justicia":4,
        }
        saveDiputado('arias-cañete', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6958,
              intervenciones: 14,
              palabras: 6734,
              "p_terrorismo":60,
              "p_infraestructuras":9,
              "p_empleo":82,
              "p_salud y sanidad":3,
        }
        saveDiputado('canet-coma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 6960,
              intervenciones: 2,
              palabras: 6544,
              "p_empleo":164,
              "p_terrorismo":5,
              "p_economía":235,
              "p_justicia":2,
        }
        saveDiputado('saiz-cortes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7019,
              intervenciones: 15,
              palabras: 6110,
              "p_economía":799,
              "p_terrorismo":20,
              "p_infraestructuras":12,
              "p_pensiones":3,
        }
        saveDiputado('cotillas-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7034,
              intervenciones: 3,
              palabras: 5421,
              "p_terrorismo":40,
              "p_vivienda":5,
              "p_economía":1551,
              "p_justicia":2,
        }
        saveDiputado('barcenas-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7039,
              intervenciones: 13,
              palabras: 5818,
              "p_terrorismo":90,
              "p_infraestructuras":1,
              "p_salud y sanidad":9,
              "p_economía":940,
              "p_educacion":115,
              "p_justicia":1,
        }
        saveDiputado('lopez-revilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7084,
              intervenciones: 17,
              palabras: 6835,
              "p_terrorismo":55,
              "p_economía":94,
              "p_salud y sanidad":3,
              "p_educacion":5,
              "p_pensiones":3,
              "p_infraestructuras":4,
        }
        saveDiputado('bonilla-dominguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7086,
              intervenciones: 11,
              palabras: 6252,
              "p_empleo":82,
              "p_terrorismo":80,
              "p_vivienda":50,
              "p_medioambiente":1,
              "p_economía":564,
              "p_jueventud":2,
        }
        saveDiputado('trujillo-garzon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7120,
              intervenciones: 15,
              palabras: 6514,
              "p_salud y sanidad":3,
              "p_economía":470,
              "p_terrorismo":25,
              "p_educacion":30,
              "p_justicia":3,
        }
        saveDiputado('molina-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7143,
              intervenciones: 20,
              palabras: 6705,
              "p_infraestructuras":10,
              "p_economía":282,
              "p_terrorismo":45,
              "p_medioambiente":1,
        }
        saveDiputado('santa-ana-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7275,
              intervenciones: 4,
              palabras: 6060,
              "p_empleo":492,
              "p_terrorismo":15,
              "p_infraestructuras":18,
              "p_economía":611,
              "p_pensiones":6,
              "p_salud y sanidad":3,
              "p_inmigracion":48,
              "p_medioambiente":2,
        }
        saveDiputado('salazar-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7329,
              intervenciones: 19,
              palabras: 6858,
              "p_terrorismo":30,
              "p_infraestructuras":5,
              "p_medioambiente":2,
              "p_economía":329,
              "p_pensiones":9,
              "p_justicia":1,
        }
        saveDiputado('ayllon-manso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7337,
              intervenciones: 10,
              palabras: 6962,
              "p_terrorismo":35,
              "p_salud y sanidad":195,
              "p_infraestructuras":1,
              "p_economía":94,
        }
        saveDiputado('tortosa-urrea', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7373,
              intervenciones: 17,
              palabras: 6911,
              "p_infraestructuras":6,
              "p_educacion":5,
              "p_terrorismo":75,
              "p_justicia":9,
              "p_economía":282,
        }
        saveDiputado('alvarez-oteo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7397,
              intervenciones: 14,
              palabras: 7208,
              "p_medioambiente":5,
              "p_terrorismo":15,
              "p_economía":94,
              "p_vivienda":5,
        }
        saveDiputado('amuedo-moral', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7436,
              intervenciones: 17,
              palabras: 6312,
              "p_terrorismo":65,
              "p_infraestructuras":13,
              "p_salud y sanidad":21,
              "p_economía":940,
        }
        saveDiputado('reguera-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7479,
              intervenciones: 17,
              palabras: 6189,
              "p_empleo":492,
              "p_economía":705,
              "p_terrorismo":5,
              "p_pensiones":3,
        }
        saveDiputado('mato-adrover', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7495,
              intervenciones: 18,
              palabras: 6604,
              "p_infraestructuras":4,
              "p_salud y sanidad":21,
              "p_terrorismo":20,
              "p_medioambiente":2,
              "p_justicia":7,
              "p_educacion":230,
              "p_economía":188,
              "p_empleo":328,
              "p_violencia machista":1,
        }
        saveDiputado('rodriguez-maniega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7497,
              intervenciones: 10,
              palabras: 7323,
              "p_terrorismo":35,
              "p_infraestructuras":8,
              "p_salud y sanidad":21,
              "p_economía":47,
              "p_educacion":5,
              "p_inseguridad":8,
        }
        saveDiputado('murcia-barcelo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7529,
              intervenciones: 11,
              palabras: 7012,
              "p_vivienda":20,
              "p_economía":235,
              "p_justicia":5,
              "p_salud y sanidad":9,
              "p_inmigracion":24,
              "p_terrorismo":5,
              "p_empleo":164,
        }
        saveDiputado('moreno-castrillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7598,
              intervenciones: 24,
              palabras: 6857,
              "p_terrorismo":90,
              "p_infraestructuras":10,
              "p_educacion":100,
              "p_medioambiente":1,
              "p_salud y sanidad":9,
              "p_empleo":82,
              "p_economía":329,
        }
        saveDiputado('mercant-nadal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7621,
              intervenciones: 22,
              palabras: 6984,
              "p_salud y sanidad":177,
              "p_infraestructuras":2,
              "p_educacion":30,
              "p_terrorismo":35,
              "p_medioambiente":1,
              "p_economía":282,
        }
        saveDiputado('soria-escoms', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7660,
              intervenciones: 15,
              palabras: 7138,
              "p_empleo":246,
              "p_terrorismo":60,
              "p_educacion":40,
              "p_economía":94,
              "p_salud y sanidad":6,
              "p_medioambiente":1,
        }
        saveDiputado('peralta-viñes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7722,
              intervenciones: 8,
              palabras: 6493,
              "p_terrorismo":40,
              "p_infraestructuras":21,
              "p_economía":1128,
        }
        saveDiputado('villalba-alvarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7772,
              intervenciones: 12,
              palabras: 6917,
              "p_terrorismo":75,
              "p_economía":611,
              "p_educacion":25,
              "p_medioambiente":1,
              "p_empleo":82,
              "p_justicia":1,
        }
        saveDiputado('carrion-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7788,
              intervenciones: 15,
              palabras: 7447,
              "p_infraestructuras":17,
              "p_terrorismo":15,
              "p_medioambiente":4,
              "p_salud y sanidad":15,
              "p_economía":188,
              "p_justicia":2,
              "p_racismo":1,
              "p_inmigracion":24,
        }
        saveDiputado('heredia-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7800,
              intervenciones: 9,
              palabras: 6737,
              "p_empleo":328,
              "p_terrorismo":25,
              "p_economía":658,
              "p_justicia":1,
              "p_infraestructuras":1,
              "p_educacion":5,
        }
        saveDiputado('amor-acedo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 7951,
              intervenciones: 5,
              palabras: 7397,
              "p_terrorismo":95,
              "p_economía":423,
              "p_salud y sanidad":6,
              "p_justicia":3,
              "p_infraestructuras":1,
              "p_medioambiente":1,
        }
        saveDiputado('puig-de-la-bellacasa-aguirre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8026,
              intervenciones: 20,
              palabras: 7222,
              "p_salud y sanidad":15,
              "p_economía":564,
              "p_terrorismo":120,
              "p_infraestructuras":4,
              "p_medioambiente":1,
        }
        saveDiputado('martinez-sieso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8050,
              intervenciones: 8,
              palabras: 7110,
              "p_terrorismo":65,
              "p_economía":799,
              "p_infraestructuras":1,
              "p_educacion":35,
        }
        saveDiputado('miranda-hita', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8095,
              intervenciones: 24,
              palabras: 6337,
              "p_economía":1128,
              "p_empleo":492,
              "p_terrorismo":5,
              "p_infraestructuras":3,
              "p_justicia":3,
              "p_medioambiente":1,
              "p_pensiones":6,
        }
        saveDiputado('rudi-ubeda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8132,
              intervenciones: 12,
              palabras: 6679,
              "p_vivienda":40,
              "p_economía":376,
              "p_justicia":1,
              "p_terrorismo":35,
              "p_infraestructuras":35,
              "p_clase politica":78,
              "p_empleo":820,
              "p_medioambiente":3,
              "p_educacion":5,
        }
        saveDiputado('perez-arca', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8146,
              intervenciones: 28,
              palabras: 7548,
              "p_economía":282,
              "p_infraestructuras":3,
              "p_salud y sanidad":9,
              "p_educacion":20,
              "p_terrorismo":30,
              "p_inmigracion":24,
              "p_vivienda":5,
              "p_empleo":82,
              "p_justicia":3,
        }
        saveDiputado('vazquez-blanco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8155,
              intervenciones: 14,
              palabras: 7410,
              "p_terrorismo":95,
              "p_economía":564,
              "p_infraestructuras":1,
              "p_salud y sanidad":15,
        }
        saveDiputado('monteserin-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8270,
              intervenciones: 12,
              palabras: 7787,
              "p_terrorismo":65,
              "p_economía":329,
              "p_justicia":5,
              "p_medioambiente":16,
              "p_infraestructuras":5,
              "p_salud y sanidad":3,
        }
        saveDiputado('carro-garrote', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8333,
              intervenciones: 12,
              palabras: 7781,
              "p_inmigracion":24,
              "p_educacion":65,
              "p_infraestructuras":8,
              "p_terrorismo":65,
              "p_economía":329,
              "p_medioambiente":1,
        }
        saveDiputado('navarro-olivella', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8365,
              intervenciones: 21,
              palabras: 7493,
              "p_terrorismo":40,
              "p_economía":470,
              "p_infraestructuras":6,
              "p_justicia":2,
              "p_empleo":246,
              "p_salud y sanidad":3,
        }
        saveDiputado('merino-delgado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8487,
              intervenciones: 2,
              palabras: 7172,
              "p_empleo":246,
              "p_terrorismo":80,
              "p_salud y sanidad":6,
              "p_vivienda":75,
              "p_economía":893,
              "p_justicia":3,
              "p_medioambiente":1,
              "p_infraestructuras":1,
        }
        saveDiputado('prieto-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8593,
              intervenciones: 8,
              palabras: 7968,
              "p_terrorismo":40,
              "p_infraestructuras":19,
              "p_economía":517,
              "p_medioambiente":1,
              "p_inseguridad":8,
        }
        saveDiputado('guillen-izquierdo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8628,
              intervenciones: 28,
              palabras: 7987,
              "p_inseguridad":16,
              "p_infraestructuras":1,
              "p_terrorismo":40,
              "p_economía":376,
              "p_educacion":60,
              "p_guerra":1,
              "p_justicia":1,
              "p_pensiones":6,
        }
        saveDiputado('duran-ramos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8679,
              intervenciones: 38,
              palabras: 8356,
              "p_terrorismo":60,
              "p_economía":47,
              "p_justicia":17,
              "p_salud y sanidad":9,
        }
        saveDiputado('rascon-ortega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8735,
              intervenciones: 39,
              palabras: 7742,
              "p_terrorismo":65,
              "p_vivienda":35,
              "p_economía":564,
              "p_clase politica":52,
              "p_justicia":1,
              "p_jueventud":4,
              "p_inmigracion":24,
              "p_salud y sanidad":15,
              "p_pensiones":30,
              "p_inseguridad":8,
        }
        saveDiputado('ruiz-i-carbonell', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8786,
              intervenciones: 77,
              palabras: 8118,
              "p_terrorismo":85,
              "p_infraestructuras":3,
              "p_educacion":25,
              "p_guerra":3,
              "p_empleo":164,
              "p_salud y sanidad":3,
        }
        saveDiputado('lanzuela-marina', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8875,
              intervenciones: 12,
              palabras: 8136,
              "p_terrorismo":140,
              "p_economía":329,
              "p_clase politica":26,
              "p_justicia":6,
              "p_empleo":164,
              "p_infraestructuras":3,
              "p_inseguridad":8,
              "p_salud y sanidad":3,
        }
        saveDiputado('gonzalez-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8968,
              intervenciones: 14,
              palabras: 8120,
              "p_terrorismo":80,
              "p_economía":658,
              "p_justicia":6,
              "p_clase politica":26,
              "p_inseguridad":8,
        }
        saveDiputado('zarrias-arevalo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8970,
              intervenciones: 14,
              palabras: 8314,
              "p_terrorismo":25,
              "p_infraestructuras":9,
              "p_pensiones":3,
              "p_empleo":164,
              "p_economía":376,
              "p_medioambiente":5,
              "p_salud y sanidad":3,
              "p_justicia":1,
        }
        saveDiputado('oria-galloso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 8975,
              intervenciones: 12,
              palabras: 8173,
              "p_terrorismo":85,
              "p_inmigracion":288,
              "p_educacion":25,
              "p_economía":329,
              "p_salud y sanidad":12,
              "p_justicia":3,
        }
        saveDiputado('terron-i-cusi', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9012,
              intervenciones: 11,
              palabras: 8021,
              "p_terrorismo":90,
              "p_infraestructuras":6,
              "p_economía":752,
              "p_guerra":1,
              "p_empleo":82,
              "p_vivienda":5,
        }
        saveDiputado('rodriguez-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9029,
              intervenciones: 8,
              palabras: 8749,
              "p_terrorismo":65,
              "p_economía":47,
              "p_justicia":127,
              "p_infraestructuras":1,
        }
        saveDiputado('conde-pumpido-touron', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9061,
              intervenciones: 8,
              palabras: 7003,
              "p_terrorismo":280,
              "p_economía":1645,
              "p_educacion":5,
              "p_vivienda":5,
              "p_medioambiente":1,
              "p_empleo":82,
        }
        saveDiputado('lopez-garrido', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9089,
              intervenciones: 21,
              palabras: 8411,
              "p_terrorismo":85,
              "p_economía":470,
              "p_justicia":7,
              "p_medioambiente":1,
              "p_educacion":10,
        }
        saveDiputado('de-francisco-herrero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9133,
              intervenciones: 13,
              palabras: 8783,
              "p_infraestructuras":3,
              "p_economía":141,
              "p_empleo":82,
              "p_terrorismo":25,
              "p_salud y sanidad":3,
              "p_clase politica":26,
              "p_justicia":5,
        }
        saveDiputado('muñoz-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9138,
              intervenciones: 17,
              palabras: 8133,
              "p_terrorismo":25,
              "p_infraestructuras":32,
              "p_economía":611,
              "p_salud y sanidad":6,
              "p_empleo":246,
        }
        saveDiputado('ramallo-vazquez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9154,
              intervenciones: 53,
              palabras: 8782,
              "p_infraestructuras":4,
              "p_pensiones":27,
              "p_terrorismo":40,
              "p_educacion":30,
              "p_medioambiente":3,
              "p_salud y sanidad":3,
        }
        saveDiputado('montalban-goicoechea', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9413,
              intervenciones: 15,
              palabras: 9001,
              "p_empleo":82,
              "p_terrorismo":25,
              "p_educacion":225,
              "p_justicia":1,
              "p_medioambiente":1,
              "p_salud y sanidad":3,
        }
        saveDiputado('fabra-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9489,
              intervenciones: 7,
              palabras: 8204,
              "p_terrorismo":30,
              "p_economía":1128,
              "p_educacion":90,
              "p_infraestructuras":2,
        }
        saveDiputado('ayala-vargas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9494,
              intervenciones: 18,
              palabras: 8582,
              "p_terrorismo":45,
              "p_economía":564,
              "p_educacion":10,
              "p_medioambiente":3,
              "p_empleo":164,
              "p_salud y sanidad":3,
              "p_infraestructuras":6,
              "p_justicia":1,
              "p_clase politica":26,
        }
        saveDiputado('torme-pardo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9546,
              intervenciones: 11,
              palabras: 7085,
              "p_empleo":246,
              "p_terrorismo":75,
              "p_infraestructuras":1,
              "p_economía":2068,
              "p_justicia":5,
              "p_medioambiente":1,
              "p_educacion":10,
        }
        saveDiputado('vegara-figueras', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9551,
              intervenciones: 18,
              palabras: 9129,
              "p_drogas":5,
              "p_terrorismo":90,
              "p_salud y sanidad":33,
              "p_economía":188,
              "p_pensiones":3,
              "p_justicia":2,
              "p_infraestructuras":11,
        }
        saveDiputado('gomez-santamaria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9556,
              intervenciones: 37,
              palabras: 7374,
              "p_vivienda":20,
              "p_economía":1269,
              "p_empleo":656,
              "p_salud y sanidad":3,
              "p_pensiones":24,
              "p_justicia":3,
              "p_terrorismo":20,
              "p_infraestructuras":2,
        }
        saveDiputado('martinez-saiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9562,
              intervenciones: 10,
              palabras: 8220,
              "p_terrorismo":85,
              "p_economía":1175,
              "p_justicia":8,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
              "p_educacion":20,
        }
        saveDiputado('lucena-betriu', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9566,
              intervenciones: 13,
              palabras: 9360,
              "p_medioambiente":1,
              "p_economía":94,
              "p_terrorismo":20,
              "p_educacion":20,
              "p_justicia":2,
              "p_infraestructuras":1,
              "p_salud y sanidad":3,
        }
        saveDiputado('trujillo-rincon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9568,
              intervenciones: 161,
              palabras: 8494,
              "p_terrorismo":110,
              "p_infraestructuras":3,
              "p_medioambiente":15,
              "p_economía":141,
        }
        saveDiputado('madero-jarabo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9574,
              intervenciones: 17,
              palabras: 8888,
              "p_terrorismo":85,
              "p_justicia":8,
              "p_economía":282,
              "p_educacion":45,
              "p_medioambiente":3,
              "p_empleo":164,
              "p_inseguridad":8,
              "p_salud y sanidad":6,
        }
        saveDiputado('fernandez-de-capel-baños', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9748,
              intervenciones: 5,
              palabras: 8317,
              "p_terrorismo":175,
              "p_economía":1222,
              "p_educacion":5,
              "p_medioambiente":1,
              "p_salud y sanidad":3,
        }
        saveDiputado('azcorra-saloña', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9830,
              intervenciones: 15,
              palabras: 9500,
              "p_terrorismo":75,
              "p_inmigracion":24,
              "p_empleo":82,
              "p_economía":47,
              "p_medioambiente":1,
              "p_clase politica":26,
        }
        saveDiputado('vera-pro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9841,
              intervenciones: 26,
              palabras: 9317,
              "p_economía":188,
              "p_educacion":20,
              "p_terrorismo":95,
              "p_infraestructuras":3,
              "p_justicia":6,
              "p_empleo":82,
        }
        saveDiputado('segura-clavell', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9855,
              intervenciones: 18,
              palabras: 9102,
              "p_salud y sanidad":42,
              "p_clase politica":26,
              "p_economía":517,
              "p_educacion":20,
              "p_terrorismo":45,
              "p_infraestructuras":6,
              "p_medioambiente":1,
              "p_pensiones":6,
        }
        saveDiputado('campos-arteseros', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9862,
              intervenciones: 6,
              palabras: 8794,
              "p_terrorismo":30,
              "p_infraestructuras":6,
              "p_economía":893,
              "p_pensiones":24,
              "p_justicia":3,
              "p_empleo":82,
        }
        saveDiputado('aparicio-bravo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9873,
              intervenciones: 14,
              palabras: 9257,
              "p_salud y sanidad":3,
              "p_economía":376,
              "p_inseguridad":8,
              "p_terrorismo":70,
              "p_justicia":7,
              "p_empleo":82,
        }
        saveDiputado('gallego-barrero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9939,
              intervenciones: 10,
              palabras: 9568,
              "p_terrorismo":55,
              "p_justicia":22,
              "p_educacion":15,
              "p_economía":141,
              "p_empleo":82,
              "p_salud y sanidad":6,
        }
        saveDiputado('divar-blanco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 9940,
              intervenciones: 14,
              palabras: 9206,
              "p_terrorismo":40,
              "p_infraestructuras":14,
              "p_economía":517,
              "p_justicia":2,
              "p_salud y sanidad":6,
              "p_medioambiente":3,
              "p_empleo":82,
        }
        saveDiputado('moraleda-quilez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10010,
              intervenciones: 25,
              palabras: 8696,
              "p_terrorismo":140,
              "p_economía":987,
              "p_educacion":30,
              "p_guerra":1,
              "p_infraestructuras":3,
              "p_inmigracion":24,
              "p_pensiones":3,
              "p_justicia":1,
        }
        saveDiputado('becerril-bustamante', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10082,
              intervenciones: 26,
              palabras: 9230,
              "p_economía":564,
              "p_vivienda":15,
              "p_infraestructuras":21,
              "p_salud y sanidad":3,
              "p_terrorismo":30,
              "p_justicia":4,
              "p_medioambiente":3,
              "p_empleo":82,
        }
        saveDiputado('montesinos-de-miguel', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10114,
              intervenciones: 6,
              palabras: 9948,
              "p_terrorismo":85,
              "p_infraestructuras":3,
              "p_economía":47,
              "p_justicia":1,
        }
        saveDiputado('rallo-lombarte', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10132,
              intervenciones: 9,
              palabras: 9375,
              "p_terrorismo":125,
              "p_infraestructuras":28,
              "p_economía":470,
              "p_justicia":1,
              "p_salud y sanidad":3,
              "p_medioambiente":85,
        }
        saveDiputado('quiros-pulgar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10170,
              intervenciones: 11,
              palabras: 7336,
              "p_empleo":492,
              "p_economía":2209,
              "p_terrorismo":75,
              "p_justicia":2,
              "p_infraestructuras":1,
        }
        saveDiputado('mesquida-ferrando', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10180,
              intervenciones: 28,
              palabras: 9684,
              "p_justicia":36,
              "p_infraestructuras":2,
              "p_terrorismo":110,
              "p_economía":94,
              "p_educacion":30,
              "p_empleo":82,
              "p_medioambiente":2,
        }
        saveDiputado('gonzalez-pons', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10288,
              intervenciones: 8,
              palabras: 8449,
              "p_terrorismo":105,
              "p_economía":1598,
              "p_infraestructuras":4,
              "p_empleo":82,
              "p_educacion":10,
        }
        saveDiputado('gonzalez-marin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10350,
              intervenciones: 18,
              palabras: 9993,
              "p_terrorismo":60,
              "p_infraestructuras":12,
              "p_justicia":3,
              "p_medioambiente":26,
              "p_educacion":60,
              "p_salud y sanidad":12,
              "p_economía":94,
        }
        saveDiputado('estrada-ibars', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10386,
              intervenciones: 3,
              palabras: 10053,
              "p_terrorismo":75,
              "p_economía":235,
              "p_justicia":3,
              "p_educacion":5,
        }
        saveDiputado('hernandez-pampaloni', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10459,
              intervenciones: 15,
              palabras: 8628,
              "p_terrorismo":25,
              "p_clase politica":26,
              "p_inmigracion":540,
              "p_educacion":25,
              "p_economía":564,
              "p_infraestructuras":2,
              "p_empleo":574,
        }
        saveDiputado('torrado-de-castro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10460,
              intervenciones: 12,
              palabras: 9390,
              "p_terrorismo":65,
              "p_economía":799,
              "p_justicia":3,
              "p_inmigracion":24,
              "p_medioambiente":1,
              "p_salud y sanidad":9,
              "p_infraestructuras":1,
              "p_empleo":82,
              "p_clase politica":26,
        }
        saveDiputado('puche-rodriguez-acosta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10464,
              intervenciones: 235,
              palabras: 8787,
              "p_terrorismo":105,
              "p_infraestructuras":2,
              "p_economía":376,
              "p_pensiones":15,
              "p_justicia":1,
              "p_salud y sanidad":3,
        }
        saveDiputado('barrio-de-penagos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10527,
              intervenciones: 99,
              palabras: 9797,
              "p_terrorismo":165,
              "p_salud y sanidad":18,
              "p_economía":47,
              "p_medioambiente":5,
        }
        saveDiputado('reyes-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10621,
              intervenciones: 5,
              palabras: 9820,
              "p_terrorismo":75,
              "p_infraestructuras":1,
              "p_salud y sanidad":6,
              "p_economía":329,
              "p_inmigracion":24,
              "p_educacion":315,
              "p_clase politica":26,
        }
        saveDiputado('peris-cervera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10717,
              intervenciones: 21,
              palabras: 8480,
              "p_terrorismo":55,
              "p_infraestructuras":6,
              "p_economía":1786,
              "p_medioambiente":4,
              "p_salud y sanidad":3,
              "p_guerra":1,
              "p_educacion":25,
              "p_empleo":246,
              "p_pensiones":3,
              "p_justicia":3,
        }
        saveDiputado('solana-barras', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10767,
              intervenciones: 12,
              palabras: 9637,
              "p_terrorismo":50,
              "p_vivienda":75,
              "p_economía":752,
              "p_empleo":164,
              "p_infraestructuras":1,
              "p_salud y sanidad":6,
              "p_educacion":20,
              "p_medioambiente":2,
        }
        saveDiputado('castellano-ramon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10816,
              intervenciones: 28,
              palabras: 10058,
              "p_infraestructuras":13,
              "p_terrorismo":80,
              "p_justicia":5,
              "p_salud y sanidad":24,
              "p_educacion":85,
              "p_economía":329,
              "p_empleo":82,
        }
        saveDiputado('luena-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 10836,
              intervenciones: 21,
              palabras: 10396,
              "p_medioambiente":2,
              "p_terrorismo":140,
              "p_economía":188,
              "p_educacion":5,
        }
        saveDiputado('aranda-alvarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11076,
              intervenciones: 10,
              palabras: 10132,
              "p_economía":517,
              "p_medioambiente":2,
              "p_terrorismo":40,
              "p_infraestructuras":2,
              "p_educacion":5,
              "p_empleo":328,
        }
        saveDiputado('berenguer-fuster', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11171,
              intervenciones: 15,
              palabras: 9600,
              "p_terrorismo":160,
              "p_salud y sanidad":3,
              "p_educacion":110,
              "p_economía":1222,
              "p_justicia":1,
        }
        saveDiputado('gomez-condado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11192,
              intervenciones: 23,
              palabras: 9938,
              "p_medioambiente":2,
              "p_terrorismo":135,
              "p_economía":987,
              "p_pensiones":3,
              "p_salud y sanidad":3,
              "p_justicia":4,
              "p_educacion":5,
        }
        saveDiputado('unzalu-perez-de-eulate', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11194,
              intervenciones: 12,
              palabras: 10546,
              "p_terrorismo":80,
              "p_salud y sanidad":84,
              "p_economía":282,
              "p_inmigracion":24,
              "p_empleo":82,
              "p_educacion":25,
              "p_inseguridad":8,
              "p_justicia":2,
              "p_medioambiente":1,
        }
        saveDiputado('cabezon-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11236,
              intervenciones: 48,
              palabras: 9996,
              "p_terrorismo":80,
              "p_infraestructuras":8,
              "p_economía":752,
              "p_pensiones":12,
              "p_justicia":33,
              "p_inmigracion":24,
              "p_inseguridad":8,
              "p_empleo":82,
              "p_medioambiente":1,
        }
        saveDiputado('tarno-blanco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11254,
              intervenciones: 17,
              palabras: 9884,
              "p_terrorismo":45,
              "p_economía":1128,
              "p_justicia":23,
              "p_infraestructuras":1,
              "p_educacion":80,
              "p_medioambiente":5,
              "p_salud y sanidad":3,
        }
        saveDiputado('campo-moreno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11272,
              intervenciones: 18,
              palabras: 9569,
              "p_terrorismo":140,
              "p_salud y sanidad":288,
              "p_economía":1034,
              "p_educacion":135,
              "p_infraestructuras":2,
              "p_inmigracion":12,
              "p_jueventud":2,
        }
        saveDiputado('martinez-soriano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11363,
              intervenciones: 25,
              palabras: 10780,
              "p_terrorismo":50,
              "p_salud y sanidad":3,
              "p_justicia":15,
              "p_economía":329,
              "p_infraestructuras":9,
              "p_clase politica":52,
        }
        saveDiputado('sanchez-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11418,
              intervenciones: 12,
              palabras: 8416,
              "p_terrorismo":70,
              "p_economía":2867,
              "p_infraestructuras":2,
              "p_justicia":3,
        }
        saveDiputado('espadas-moncalvillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11445,
              intervenciones: 25,
              palabras: 10857,
              "p_terrorismo":70,
              "p_justicia":2,
              "p_pensiones":12,
              "p_infraestructuras":4,
              "p_salud y sanidad":3,
              "p_economía":188,
              "p_clase politica":52,
              "p_educacion":130,
              "p_violencia machista":2,
        }
        saveDiputado('garcia-valls', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11672,
              intervenciones: 16,
              palabras: 10338,
              "p_terrorismo":95,
              "p_vivienda":60,
              "p_economía":1081,
              "p_justicia":1,
              "p_jueventud":8,
              "p_infraestructuras":4,
              "p_educacion":5,
        }
        saveDiputado('muñoz-resta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11685,
              intervenciones: 6,
              palabras: 9224,
              "p_empleo":164,
              "p_terrorismo":25,
              "p_infraestructuras":3,
              "p_economía":1034,
              "p_pensiones":171,
              "p_inmigracion":1020,
              "p_educacion":10,
              "p_medioambiente":3,
              "p_justicia":1,
        }
        saveDiputado('serrano-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11690,
              intervenciones: 17,
              palabras: 10514,
              "p_terrorismo":55,
              "p_vivienda":25,
              "p_jueventud":4,
              "p_educacion":65,
              "p_infraestructuras":13,
              "p_economía":188,
              "p_empleo":738,
              "p_justicia":3,
        }
        saveDiputado('gonzalez-muñoz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11709,
              intervenciones: 5,
              palabras: 10499,
              "p_terrorismo":155,
              "p_salud y sanidad":27,
              "p_vivienda":15,
              "p_economía":940,
              "p_justicia":1,
              "p_educacion":45,
              "p_medioambiente":1,
              "p_infraestructuras":1,
        }
        saveDiputado('muriel-herrero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11715,
              intervenciones: 23,
              palabras: 10436,
              "p_salud y sanidad":57,
              "p_educacion":50,
              "p_clase politica":26,
              "p_terrorismo":80,
              "p_economía":940,
              "p_medioambiente":2,
              "p_infraestructuras":3,
              "p_vivienda":5,
              "p_guerra":1,
        }
        saveDiputado('cano-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 11771,
              intervenciones: 22,
              palabras: 11520,
              "p_medioambiente":16,
              "p_justicia":1,
              "p_terrorismo":15,
              "p_salud y sanidad":6,
              "p_educacion":5,
              "p_economía":94,
              "p_infraestructuras":4,
        }
        saveDiputado('chacon-carretero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 12036,
              intervenciones: 17,
              palabras: 11520,
              "p_infraestructuras":10,
              "p_medioambiente":19,
              "p_terrorismo":100,
              "p_salud y sanidad":12,
              "p_economía":282,
              "p_inseguridad":8,
        }
        saveDiputado('ferre-fons', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 12273,
              intervenciones: 32,
              palabras: 11611,
              "p_infraestructuras":1,
              "p_terrorismo":80,
              "p_justicia":4,
              "p_economía":376,
              "p_educacion":40,
              "p_drogas":1,
        }
        saveDiputado('gonzalez-sinde-reig', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 12406,
              intervenciones: 18,
              palabras: 11579,
              "p_terrorismo":115,
              "p_infraestructuras":2,
              "p_economía":423,
              "p_educacion":105,
              "p_medioambiente":2,
              "p_inseguridad":8,
              "p_empleo":82,
        }
        saveDiputado('alegria-continente', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 12514,
              intervenciones: 112,
              palabras: 11470,
              "p_terrorismo":120,
              "p_salud y sanidad":63,
              "p_economía":282,
              "p_infraestructuras":8,
              "p_pensiones":6,
              "p_justicia":1,
              "p_medioambiente":3,
              "p_guerra":1,
        }
        saveDiputado('pastor-julian', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 12617,
              intervenciones: 28,
              palabras: 11519,
              "p_economía":611,
              "p_terrorismo":70,
              "p_infraestructuras":8,
              "p_educacion":265,
              "p_pensiones":3,
              "p_guerra":1,
        }
        saveDiputado('villagrasa-perez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 12964,
              intervenciones: 16,
              palabras: 11752,
              "p_terrorismo":75,
              "p_infraestructuras":8,
              "p_vivienda":10,
              "p_inmigracion":48,
              "p_educacion":40,
              "p_economía":940,
              "p_jueventud":6,
              "p_justicia":1,
              "p_salud y sanidad":3,
              "p_violencia machista":1,
        }
        saveDiputado('ros-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13050,
              intervenciones: 27,
              palabras: 11980,
              "p_terrorismo":120,
              "p_vivienda":10,
              "p_economía":470,
              "p_educacion":310,
              "p_medioambiente":1,
              "p_salud y sanidad":6,
              "p_inseguridad":8,
              "p_infraestructuras":4,
              "p_jueventud":4,
              "p_justicia":2,
        }
        saveDiputado('bono-ara', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13074,
              intervenciones: 28,
              palabras: 12042,
              "p_salud y sanidad":48,
              "p_justicia":1,
              "p_economía":470,
              "p_inmigracion":240,
              "p_infraestructuras":5,
              "p_pensiones":42,
              "p_educacion":40,
              "p_terrorismo":45,
              "p_violencia machista":1,
        }
        saveDiputado('elias-cordon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13078,
              intervenciones: 20,
              palabras: 10886,
              "p_terrorismo":50,
              "p_vivienda":130,
              "p_economía":1551,
              "p_justicia":3,
              "p_infraestructuras":12,
              "p_salud y sanidad":24,
              "p_medioambiente":2,
              "p_pensiones":45,
              "p_educacion":5,
              "p_empleo":246,
              "p_inmigracion":24,
        }
        saveDiputado('guaita-vaño', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13183,
              intervenciones: 21,
              palabras: 12160,
              "p_educacion":75,
              "p_infraestructuras":8,
              "p_salud y sanidad":144,
              "p_terrorismo":125,
              "p_economía":564,
              "p_jueventud":2,
        }
        saveDiputado('cabañes-andres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13234,
              intervenciones: 24,
              palabras: 11780,
              "p_terrorismo":115,
              "p_infraestructuras":5,
              "p_economía":1175,
              "p_medioambiente":12,
              "p_justicia":1,
              "p_vivienda":10,
              "p_salud y sanidad":3,
              "p_inseguridad":8,
              "p_educacion":5,
        }
        saveDiputado('fernandez-aguerri', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13328,
              intervenciones: 19,
              palabras: 11512,
              "p_terrorismo":85,
              "p_salud y sanidad":33,
              "p_justicia":4,
              "p_racismo":1,
              "p_jueventud":4,
              "p_infraestructuras":1,
              "p_economía":1551,
              "p_educacion":40,
              "p_medioambiente":2,
        }
        saveDiputado('lissavetzky-diez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13332,
              intervenciones: 30,
              palabras: 12006,
              "p_salud y sanidad":12,
              "p_terrorismo":120,
              "p_economía":987,
              "p_clase politica":52,
              "p_infraestructuras":5,
        }
        saveDiputado('seller-roca-de-togores', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13376,
              intervenciones: 22,
              palabras: 12316,
              "p_terrorismo":90,
              "p_infraestructuras":10,
              "p_salud y sanidad":9,
              "p_vivienda":45,
              "p_economía":611,
              "p_clase politica":26,
              "p_justicia":11,
              "p_pensiones":57,
              "p_jueventud":4,
              "p_educacion":5,
              "p_empleo":82,
        }
        saveDiputado('cabezon-arbat', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13451,
              intervenciones: 44,
              palabras: 12526,
              "p_terrorismo":85,
              "p_infraestructuras":14,
              "p_medioambiente":3,
              "p_economía":470,
              "p_salud y sanidad":21,
              "p_educacion":30,
              "p_empleo":82,
        }
        saveDiputado('perez-herraiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13457,
              intervenciones: 9,
              palabras: 13037,
              "p_terrorismo":90,
              "p_infraestructuras":10,
              "p_economía":235,
              "p_pensiones":30,
              "p_justicia":3,
              "p_jueventud":2,
              "p_educacion":5,
        }
        saveDiputado('perez-bueno', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13830,
              intervenciones: 12,
              palabras: 12216,
              "p_terrorismo":60,
              "p_economía":940,
              "p_jueventud":2,
              "p_educacion":530,
              "p_infraestructuras":1,
              "p_vivienda":20,
              "p_medioambiente":1,
        }
        saveDiputado('caffarel-serra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 13996,
              intervenciones: 32,
              palabras: 12874,
              "p_terrorismo":60,
              "p_educacion":330,
              "p_empleo":82,
              "p_infraestructuras":4,
              "p_economía":470,
              "p_salud y sanidad":15,
              "p_medioambiente":1,
        }
        saveDiputado('gonzalez-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14077,
              intervenciones: 19,
              palabras: 11896,
              "p_terrorismo":105,
              "p_vivienda":75,
              "p_economía":1880,
              "p_jueventud":2,
              "p_justicia":1,
              "p_infraestructuras":2,
              "p_educacion":20,
              "p_medioambiente":1,
        }
        saveDiputado('ramos-guallart', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14158,
              intervenciones: 32,
              palabras: 12962,
              "p_empleo":164,
              "p_terrorismo":160,
              "p_justicia":5,
              "p_economía":423,
              "p_educacion":50,
              "p_clase politica":208,
              "p_inseguridad":24,
              "p_infraestructuras":2,
        }
        saveDiputado('bermudez-de-castro-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14274,
              intervenciones: 66,
              palabras: 11922,
              "p_terrorismo":90,
              "p_inmigracion":144,
              "p_justicia":21,
              "p_clase politica":546,
              "p_infraestructuras":2,
              "p_empleo":410,
              "p_economía":799,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
              "p_pensiones":6,
        }
        saveDiputado('matari-saez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14285,
              intervenciones: 49,
              palabras: 12757,
              "p_terrorismo":105,
              "p_infraestructuras":13,
              "p_salud y sanidad":15,
              "p_inmigracion":396,
              "p_economía":752,
              "p_justicia":2,
        }
        saveDiputado('guerra-guerra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14368,
              intervenciones: 29,
              palabras: 12374,
              "p_terrorismo":105,
              "p_economía":1551,
              "p_educacion":80,
              "p_medioambiente":3,
              "p_salud y sanidad":3,
              "p_inmigracion":24,
              "p_infraestructuras":1,
              "p_empleo":82,
        }
        saveDiputado('bernabeu-pastor', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14450,
              intervenciones: 12,
              palabras: 12413,
              "p_terrorismo":175,
              "p_infraestructuras":13,
              "p_salud y sanidad":24,
              "p_economía":1645,
              "p_empleo":82,
              "p_pensiones":6,
              "p_educacion":30,
              "p_justicia":2,
        }
        saveDiputado('rojo-torrecilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14485,
              intervenciones: 20,
              palabras: 12920,
              "p_economía":1081,
              "p_pensiones":78,
              "p_terrorismo":70,
              "p_infraestructuras":9,
              "p_empleo":164,
              "p_inseguridad":8,
              "p_salud y sanidad":3,
              "p_vivienda":5,
              "p_jueventud":2,
              "p_educacion":20,
              "p_medioambiente":1,
              "p_inmigracion":24,
        }
        saveDiputado('marañon-basarte', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14647,
              intervenciones: 10,
              palabras: 12388,
              "p_terrorismo":45,
              "p_infraestructuras":2,
              "p_economía":2068,
              "p_salud y sanidad":6,
              "p_empleo":82,
              "p_vivienda":5,
              "p_justicia":1,
        }
        saveDiputado('martinez-robles', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14713,
              intervenciones: 44,
              palabras: 12311,
              "p_terrorismo":95,
              "p_pensiones":18,
              "p_economía":1598,
              "p_empleo":410,
              "p_infraestructuras":8,
              "p_inmigracion":48,
              "p_educacion":5,
        }
        saveDiputado('gomez-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14723,
              intervenciones: 23,
              palabras: 12855,
              "p_salud y sanidad":15,
              "p_educacion":770,
              "p_terrorismo":40,
              "p_economía":846,
              "p_empleo":82,
        }
        saveDiputado('palma-muñoz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14780,
              intervenciones: 249,
              palabras: 13230,
              "p_empleo":82,
              "p_terrorismo":165,
              "p_salud y sanidad":15,
              "p_justicia":2,
              "p_educacion":5,
              "p_infraestructuras":18,
              "p_drogas":1,
              "p_inseguridad":16,
              "p_violencia machista":1,
        }
        saveDiputado('lopez-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14830,
              intervenciones: 59,
              palabras: 13201,
              "p_terrorismo":165,
              "p_infraestructuras":7,
              "p_salud y sanidad":6,
              "p_economía":940,
              "p_pensiones":9,
              "p_educacion":115,
              "p_vivienda":5,
              "p_justicia":2,
              "p_guerra":2,
              "p_empleo":82,
              "p_medioambiente":1,
        }
        saveDiputado('roman-guerrero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 14995,
              intervenciones: 20,
              palabras: 13262,
              "p_terrorismo":270,
              "p_vivienda":610,
              "p_economía":658,
              "p_justicia":1,
              "p_infraestructuras":2,
              "p_medioambiente":2,
              "p_educacion":90,
        }
        saveDiputado('huertas-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15014,
              intervenciones: 10,
              palabras: 12426,
              "p_terrorismo":85,
              "p_economía":2256,
              "p_infraestructuras":5,
              "p_justicia":17,
              "p_empleo":164,
              "p_medioambiente":1,
              "p_educacion":10,
        }
        saveDiputado('segura-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15082,
              intervenciones: 28,
              palabras: 14311,
              "p_terrorismo":100,
              "p_economía":423,
              "p_medioambiente":41,
              "p_clase politica":26,
              "p_educacion":5,
              "p_infraestructuras":2,
              "p_inseguridad":24,
              "p_justicia":1,
              "p_salud y sanidad":9,
        }
        saveDiputado('aguilar-rivero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15150,
              intervenciones: 6,
              palabras: 13665,
              "p_terrorismo":170,
              "p_economía":1269,
              "p_justicia":4,
              "p_infraestructuras":2,
              "p_educacion":10,
        }
        saveDiputado('bonet-baiget', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15209,
              intervenciones: 10,
              palabras: 12300,
              "p_terrorismo":215,
              "p_economía":2397,
              "p_educacion":120,
              "p_infraestructuras":7,
              "p_jueventud":6,
              "p_medioambiente":3,
              "p_justicia":3,
              "p_empleo":82,
              "p_salud y sanidad":21,
              "p_vivienda":5,
        }
        saveDiputado('martinez-alonso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15302,
              intervenciones: 360,
              palabras: 13209,
              "p_inseguridad":16,
              "p_terrorismo":160,
              "p_empleo":82,
              "p_infraestructuras":2,
              "p_educacion":30,
              "p_medioambiente":3,
        }
        saveDiputado('vicepresidente', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15508,
              intervenciones: 17,
              palabras: 15117,
              "p_inseguridad":8,
              "p_terrorismo":70,
              "p_infraestructuras":5,
              "p_salud y sanidad":24,
              "p_educacion":45,
              "p_medioambiente":25,
              "p_empleo":82,
              "p_economía":47,
        }
        saveDiputado('martinez-ten', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15685,
              intervenciones: 31,
              palabras: 14129,
              "p_medioambiente":4,
              "p_justicia":57,
              "p_terrorismo":80,
              "p_inseguridad":8,
              "p_empleo":164,
              "p_economía":1081,
              "p_infraestructuras":2,
              "p_educacion":5,
        }
        saveDiputado('fernandez-bermejo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 15961,
              intervenciones: 22,
              palabras: 14085,
              "p_empleo":410,
              "p_economía":1128,
              "p_terrorismo":145,
              "p_justicia":3,
              "p_medioambiente":32,
              "p_jueventud":2,
              "p_vivienda":5,
              "p_educacion":30,
              "p_salud y sanidad":3,
              "p_inseguridad":8,
        }
        saveDiputado('iglesias-fontal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16013,
              intervenciones: 9,
              palabras: 13066,
              "p_economía":2491,
              "p_terrorismo":45,
              "p_educacion":365,
              "p_justicia":1,
        }
        saveDiputado('rodrigo-montero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16257,
              intervenciones: 23,
              palabras: 15078,
              "p_terrorismo":90,
              "p_infraestructuras":3,
              "p_vivienda":130,
              "p_economía":799,
              "p_justicia":2,
              "p_educacion":25,
              "p_salud y sanidad":15,
        }
        saveDiputado('tudanca-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16340,
              intervenciones: 26,
              palabras: 14176,
              "p_terrorismo":130,
              "p_educacion":15,
              "p_infraestructuras":3,
              "p_salud y sanidad":48,
              "p_medioambiente":5,
              "p_inseguridad":8,
              "p_economía":1786,
              "p_pensiones":3,
              "p_justicia":10,
              "p_clase politica":26,
        }
        saveDiputado('callejon-baena', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16455,
              intervenciones: 11,
              palabras: 15398,
              "p_terrorismo":165,
              "p_infraestructuras":6,
              "p_salud y sanidad":21,
              "p_economía":799,
              "p_educacion":10,
              "p_medioambiente":1,
        }
        saveDiputado('ros-peran', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16461,
              intervenciones: 57,
              palabras: 15488,
              "p_terrorismo":65,
              "p_infraestructuras":10,
              "p_economía":517,
              "p_pensiones":12,
              "p_inseguridad":8,
              "p_educacion":70,
              "p_salud y sanidad":6,
        }
        saveDiputado('alvarez-villazan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16464,
              intervenciones: 24,
              palabras: 15240,
              "p_empleo":164,
              "p_salud y sanidad":12,
              "p_economía":705,
              "p_terrorismo":165,
              "p_educacion":45,
              "p_justicia":11,
              "p_medioambiente":1,
              "p_guerra":1,
        }
        saveDiputado('hernani-burzaco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16510,
              intervenciones: 39,
              palabras: 14589,
              "p_terrorismo":85,
              "p_economía":987,
              "p_educacion":15,
              "p_medioambiente":2,
              "p_vivienda":5,
              "p_clase politica":598,
              "p_justicia":23,
              "p_infraestructuras":11,
        }
        saveDiputado('rivero-alcover', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 16781,
              intervenciones: 9,
              palabras: 13779,
              "p_terrorismo":60,
              "p_infraestructuras":1,
              "p_vivienda":75,
              "p_economía":2679,
              "p_justicia":4,
              "p_educacion":55,
              "p_empleo":82,
              "p_medioambiente":1,
        }
        saveDiputado('vaquer-caballeria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17001,
              intervenciones: 71,
              palabras: 12677,
              "p_empleo":1066,
              "p_economía":2726,
              "p_justicia":15,
              "p_terrorismo":65,
              "p_salud y sanidad":30,
              "p_educacion":10,
              "p_medioambiente":4,
              "p_vivienda":5,
              "p_pensiones":21,
              "p_infraestructuras":1,
              "p_clase politica":26,
        }
        saveDiputado('bañez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17173,
              intervenciones: 37,
              palabras: 16073,
              "p_terrorismo":240,
              "p_infraestructuras":34,
              "p_inseguridad":40,
              "p_drogas":1,
              "p_economía":423,
              "p_justicia":6,
              "p_empleo":164,
              "p_medioambiente":2,
              "p_educacion":5,
        }
        saveDiputado('romero-giron', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17295,
              intervenciones: 35,
              palabras: 15948,
              "p_terrorismo":100,
              "p_salud y sanidad":9,
              "p_economía":940,
              "p_educacion":25,
              "p_empleo":82,
              "p_jueventud":4,
              "p_infraestructuras":6,
              "p_medioambiente":4,
              "p_racismo":2,
        }
        saveDiputado('dominguez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17520,
              intervenciones: 39,
              palabras: 14980,
              "p_empleo":82,
              "p_terrorismo":85,
              "p_economía":2115,
              "p_justicia":4,
              "p_inmigracion":48,
              "p_infraestructuras":2,
              "p_salud y sanidad":3,
              "p_jueventud":6,
        }
        saveDiputado('madina-muñoz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17532,
              intervenciones: 32,
              palabras: 16292,
              "p_salud y sanidad":96,
              "p_economía":611,
              "p_educacion":30,
              "p_terrorismo":70,
              "p_inmigracion":180,
              "p_violencia machista":1,
              "p_infraestructuras":4,
              "p_justicia":1,
              "p_empleo":82,
              "p_vivienda":5,
        }
        saveDiputado('coello-fernandez-trujillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17587,
              intervenciones: 29,
              palabras: 16288,
              "p_terrorismo":90,
              "p_inmigracion":156,
              "p_educacion":30,
              "p_economía":846,
              "p_infraestructuras":23,
              "p_salud y sanidad":9,
        }
        saveDiputado('muñoz-salva', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17692,
              intervenciones: 30,
              palabras: 15617,
              "p_terrorismo":45,
              "p_economía":1786,
              "p_empleo":82,
              "p_medioambiente":2,
              "p_salud y sanidad":9,
              "p_justicia":1,
        }
        saveDiputado('lopez-agueda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17728,
              intervenciones: 23,
              palabras: 15883,
              "p_educacion":815,
              "p_terrorismo":70,
              "p_salud y sanidad":9,
              "p_economía":799,
              "p_inmigracion":24,
              "p_vivienda":5,
              "p_infraestructuras":3,
              "p_medioambiente":2,
              "p_justicia":3,
        }
        saveDiputado('vazquez-abad', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17760,
              intervenciones: 59,
              palabras: 13587,
              "p_terrorismo":190,
              "p_medioambiente":8,
              "p_educacion":55,
              "p_economía":3619,
              "p_salud y sanidad":6,
        }
        saveDiputado('serna-masia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17825,
              intervenciones: 18,
              palabras: 15120,
              "p_terrorismo":125,
              "p_vivienda":140,
              "p_economía":2068,
              "p_justicia":4,
              "p_empleo":246,
              "p_inmigracion":24,
              "p_educacion":5,
              "p_jueventud":2,
              "p_medioambiente":1,
        }
        saveDiputado('carballedo-berlanga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17972,
              intervenciones: 9,
              palabras: 17377,
              "p_terrorismo":100,
              "p_salud y sanidad":102,
              "p_economía":282,
              "p_educacion":60,
              "p_medioambiente":3,
              "p_jueventud":2,
              "p_justicia":1,
        }
        saveDiputado('sabrido-bermudez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 17980,
              intervenciones: 7,
              palabras: 15350,
              "p_terrorismo":215,
              "p_economía":2209,
              "p_pensiones":3,
              "p_justicia":2,
              "p_educacion":65,
              "p_salud y sanidad":3,
              "p_infraestructuras":3,
              "p_medioambiente":1,
              "p_empleo":82,
              "p_inmigracion":12,
        }
        saveDiputado('zambrana-pineda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18107,
              intervenciones: 17,
              palabras: 15356,
              "p_terrorismo":45,
              "p_salud y sanidad":18,
              "p_economía":2303,
              "p_justicia":13,
              "p_infraestructuras":1,
              "p_clase politica":286,
        }
        saveDiputado('lopez-carbajo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18144,
              intervenciones: 9,
              palabras: 17138,
              "p_terrorismo":125,
              "p_salud y sanidad":6,
              "p_economía":705,
              "p_educacion":10,
              "p_medioambiente":3,
              "p_empleo":82,
              "p_inmigracion":24,
              "p_infraestructuras":1,
              "p_guerra":5,
        }
        saveDiputado('lossada-torres-quevedo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18184,
              intervenciones: 15,
              palabras: 14666,
              "p_economía":2961,
              "p_terrorismo":415,
              "p_educacion":55,
              "p_infraestructuras":2,
              "p_vivienda":5,
              "p_medioambiente":1,
              "p_jueventud":4,
        }
        saveDiputado('figa-lopez-palop', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18233,
              intervenciones: 40,
              palabras: 16834,
              "p_terrorismo":115,
              "p_economía":846,
              "p_educacion":205,
              "p_justicia":1,
              "p_jueventud":2,
              "p_infraestructuras":5,
              "p_medioambiente":1,
              "p_inmigracion":24,
        }
        saveDiputado('tomas-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18338,
              intervenciones: 27,
              palabras: 14468,
              "p_empleo":328,
              "p_terrorismo":115,
              "p_economía":3243,
              "p_justicia":26,
              "p_salud y sanidad":6,
              "p_pensiones":6,
              "p_infraestructuras":3,
              "p_inseguridad":8,
        }
        saveDiputado('mas-i-estela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18449,
              intervenciones: 62,
              palabras: 17238,
              "p_terrorismo":85,
              "p_justicia":14,
              "p_infraestructuras":9,
              "p_empleo":82,
              "p_salud y sanidad":18,
              "p_economía":564,
              "p_pensiones":39,
              "p_inmigracion":72,
              "p_educacion":15,
              "p_medioambiente":3,
        }
        saveDiputado('seco-revilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18519,
              intervenciones: 24,
              palabras: 17595,
              "p_salud y sanidad":192,
              "p_clase politica":26,
              "p_terrorismo":80,
              "p_economía":94,
              "p_empleo":328,
              "p_infraestructuras":4,
              "p_educacion":20,
              "p_inmigracion":60,
        }
        saveDiputado('sanz-carrillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18571,
              intervenciones: 28,
              palabras: 16433,
              "p_empleo":164,
              "p_terrorismo":115,
              "p_infraestructuras":12,
              "p_economía":1551,
              "p_justicia":6,
              "p_educacion":25,
              "p_medioambiente":3,
              "p_inmigracion":36,
              "p_salud y sanidad":48,
              "p_clase politica":26,
              "p_pensiones":12,
        }
        saveDiputado('sahuquillo-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18758,
              intervenciones: 15,
              palabras: 15772,
              "p_terrorismo":185,
              "p_economía":2726,
        }
        saveDiputado('santero-quintilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18827,
              intervenciones: 36,
              palabras: 16663,
              "p_terrorismo":110,
              "p_economía":1692,
              "p_justicia":5,
              "p_educacion":100,
              "p_inmigracion":24,
              "p_salud y sanidad":6,
              "p_pensiones":12,
              "p_inseguridad":8,
              "p_infraestructuras":25,
              "p_jueventud":2,
        }
        saveDiputado('valcarce-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18913,
              intervenciones: 44,
              palabras: 17887,
              "p_inseguridad":40,
              "p_terrorismo":275,
              "p_justicia":13,
              "p_infraestructuras":7,
              "p_educacion":10,
              "p_economía":329,
              "p_inmigracion":24,
              "p_empleo":82,
              "p_clase politica":26,
        }
        saveDiputado('hernando-vera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 18981,
              intervenciones: 33,
              palabras: 16580,
              "p_terrorismo":215,
              "p_economía":1974,
              "p_medioambiente":20,
              "p_educacion":20,
              "p_salud y sanidad":3,
              "p_infraestructuras":3,
              "p_justicia":1,
        }
        saveDiputado('menendez-de-luarca-y-navia-osorio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 19085,
              intervenciones: 36,
              palabras: 16980,
              "p_terrorismo":115,
              "p_infraestructuras":39,
              "p_salud y sanidad":27,
              "p_economía":1692,
              "p_educacion":50,
              "p_justicia":1,
              "p_medioambiente":1,
        }
        saveDiputado('puig-gasol', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 19362,
              intervenciones: 32,
              palabras: 18125,
              "p_terrorismo":90,
              "p_justicia":2,
              "p_vivienda":85,
              "p_salud y sanidad":39,
              "p_educacion":65,
              "p_infraestructuras":19,
              "p_economía":658,
              "p_medioambiente":2,
              "p_empleo":82,
              "p_jueventud":2,
              "p_pensiones":33,
        }
        saveDiputado('muñoz-gomez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 19423,
              intervenciones: 60,
              palabras: 15792,
              "p_economía":3008,
              "p_pensiones":12,
              "p_infraestructuras":7,
              "p_terrorismo":185,
              "p_justicia":5,
              "p_educacion":30,
              "p_medioambiente":2,
              "p_empleo":82,
        }
        saveDiputado('albendea-pabon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 19663,
              intervenciones: 20,
              palabras: 13700,
              "p_terrorismo":155,
              "p_economía":5593,
              "p_salud y sanidad":42,
              "p_justicia":7,
              "p_educacion":35,
              "p_infraestructuras":16,
              "p_pensiones":15,
        }
        saveDiputado('gonzalez-gallardo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 19815,
              intervenciones: 6,
              palabras: 17495,
              "p_empleo":328,
              "p_terrorismo":70,
              "p_infraestructuras":14,
              "p_economía":1786,
              "p_pensiones":33,
              "p_justicia":1,
              "p_inmigracion":24,
              "p_jueventud":2,
              "p_educacion":20,
              "p_salud y sanidad":12,
        }
        saveDiputado('reyna-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 19913,
              intervenciones: 30,
              palabras: 17601,
              "p_terrorismo":245,
              "p_salud y sanidad":15,
              "p_educacion":1100,
              "p_medioambiente":2,
              "p_economía":799,
              "p_justicia":1,
        }
        saveDiputado('palma-i-muñoz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20071,
              intervenciones: 51,
              palabras: 18383,
              "p_terrorismo":195,
              "p_infraestructuras":30,
              "p_salud y sanidad":246,
              "p_economía":611,
              "p_educacion":15,
              "p_justicia":6,
              "p_medioambiente":3,
              "p_empleo":246,
              "p_pensiones":3,
              "p_clase politica":78,
        }
        saveDiputado('fernandez-pardo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20387,
              intervenciones: 35,
              palabras: 19818,
              "p_terrorismo":165,
              "p_justicia":5,
              "p_infraestructuras":2,
              "p_economía":188,
              "p_inmigracion":12,
              "p_educacion":15,
              "p_medioambiente":1,
              "p_salud y sanidad":6,
        }
        saveDiputado('quijano-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20391,
              intervenciones: 24,
              palabras: 18400,
              "p_terrorismo":270,
              "p_economía":1504,
              "p_justicia":4,
              "p_medioambiente":12,
              "p_salud y sanidad":18,
              "p_inmigracion":24,
              "p_infraestructuras":1,
              "p_educacion":35,
              "p_pensiones":3,
        }
        saveDiputado('casaus-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20423,
              intervenciones: 106,
              palabras: 19227,
              "p_terrorismo":295,
              "p_inmigracion":24,
              "p_educacion":30,
              "p_justicia":64,
              "p_empleo":164,
              "p_economía":47,
              "p_pensiones":3,
              "p_medioambiente":1,
              "p_salud y sanidad":3,
              "p_clase politica":26,
              "p_infraestructuras":1,
              "p_inseguridad":8,
        }
        saveDiputado('gil-lazaro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20459,
              intervenciones: 459,
              palabras: 17969,
              "p_salud y sanidad":45,
              "p_terrorismo":45,
              "p_economía":94,
              "p_infraestructuras":1,
              "p_justicia":3,
              "p_medioambiente":1,
              "p_pensiones":6,
        }
        saveDiputado('vicepresidenta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20478,
              intervenciones: 31,
              palabras: 18102,
              "p_terrorismo":160,
              "p_economía":1316,
              "p_educacion":5,
              "p_inmigracion":312,
              "p_empleo":410,
              "p_salud y sanidad":6,
              "p_pensiones":6,
              "p_infraestructuras":6,
        }
        saveDiputado('rumi-ibañez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20640,
              intervenciones: 37,
              palabras: 18935,
              "p_terrorismo":110,
              "p_vivienda":390,
              "p_economía":846,
              "p_medioambiente":3,
              "p_jueventud":2,
              "p_infraestructuras":1,
              "p_clase politica":78,
              "p_salud y sanidad":6,
              "p_justicia":2,
              "p_empleo":82,
        }
        saveDiputado('santamaria-i-mateo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 20640,
              intervenciones: 88,
              palabras: 18536,
              "p_infraestructuras":34,
              "p_terrorismo":240,
              "p_economía":752,
              "p_salud y sanidad":24,
              "p_educacion":30,
              "p_justicia":4,
              "p_pensiones":3,
              "p_empleo":574,
              "p_medioambiente":3,
        }
        saveDiputado('reinares-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21070,
              intervenciones: 72,
              palabras: 18115,
              "p_terrorismo":60,
              "p_economía":1880,
              "p_justicia":9,
              "p_infraestructuras":2,
              "p_salud y sanidad":6,
              "p_clase politica":130,
              "p_empleo":492,
              "p_pensiones":15,
              "p_medioambiente":1,
        }
        saveDiputado('moreno-bonilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21095,
              intervenciones: 30,
              palabras: 19274,
              "p_terrorismo":195,
              "p_economía":987,
              "p_medioambiente":1,
              "p_infraestructuras":17,
              "p_clase politica":208,
              "p_justicia":12,
              "p_empleo":246,
              "p_educacion":5,
        }
        saveDiputado('gonzalez-vazquez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21158,
              intervenciones: 38,
              palabras: 18230,
              "p_terrorismo":75,
              "p_economía":2538,
              "p_infraestructuras":8,
              "p_educacion":110,
              "p_justicia":4,
              "p_violencia machista":1,
              "p_jueventud":2,
        }
        saveDiputado('torres-mora', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21227,
              intervenciones: 31,
              palabras: 18166,
              "p_terrorismo":170,
              "p_economía":2679,
              "p_justicia":4,
              "p_guerra":2,
              "p_infraestructuras":3,
              "p_educacion":45,
              "p_salud y sanidad":3,
        }
        saveDiputado('mendez-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21304,
              intervenciones: 49,
              palabras: 20360,
              "p_infraestructuras":14,
              "p_medioambiente":4,
              "p_terrorismo":135,
              "p_salud y sanidad":33,
              "p_jueventud":8,
              "p_empleo":246,
              "p_justicia":24,
              "p_economía":235,
        }
        saveDiputado('de-luis-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21349,
              intervenciones: 41,
              palabras: 19883,
              "p_terrorismo":270,
              "p_economía":846,
              "p_justicia":4,
              "p_educacion":15,
              "p_infraestructuras":7,
              "p_medioambiente":14,
              "p_salud y sanidad":15,
              "p_inseguridad":8,
              "p_empleo":82,
        }
        saveDiputado('gomez-darmendrail', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21659,
              intervenciones: 75,
              palabras: 20455,
              "p_terrorismo":55,
              "p_economía":705,
              "p_justicia":1,
              "p_infraestructuras":58,
              "p_medioambiente":2,
              "p_salud y sanidad":3,
              "p_educacion":5,
        }
        saveDiputado('ruiz-llamas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21679,
              intervenciones: 184,
              palabras: 19838,
              "p_terrorismo":285,
              "p_economía":423,
              "p_medioambiente":2,
              "p_infraestructuras":3,
              "p_justicia":5,
              "p_guerra":1,
              "p_educacion":5,
              "p_nacionalismos":7,
              "p_clase politica":182,
              "p_inseguridad":8,
        }
        saveDiputado('benegas-haddad', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21817,
              intervenciones: 49,
              palabras: 17605,
              "p_economía":2914,
              "p_empleo":902,
              "p_terrorismo":125,
              "p_justicia":2,
              "p_salud y sanidad":6,
              "p_pensiones":6,
              "p_infraestructuras":2,
              "p_vivienda":5,
              "p_educacion":5,
        }
        saveDiputado('vazquez-morillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 21845,
              intervenciones: 28,
              palabras: 19182,
              "p_terrorismo":80,
              "p_economía":1551,
              "p_inmigracion":288,
              "p_pensiones":255,
              "p_justicia":2,
              "p_educacion":50,
              "p_empleo":246,
              "p_infraestructuras":3,
              "p_salud y sanidad":42,
              "p_jueventud":4,
              "p_violencia machista":1,
              "p_medioambiente":1,
        }
        saveDiputado('bravo-ibañez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22101,
              intervenciones: 7,
              palabras: 18085,
              "p_empleo":328,
              "p_terrorismo":60,
              "p_infraestructuras":23,
              "p_economía":3384,
              "p_pensiones":105,
              "p_clase politica":52,
              "p_inmigracion":24,
              "p_justicia":5,
        }
        saveDiputado('lacasa-aso', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22421,
              intervenciones: 35,
              palabras: 20553,
              "p_terrorismo":270,
              "p_infraestructuras":45,
              "p_economía":1269,
              "p_medioambiente":5,
              "p_justicia":5,
              "p_educacion":15,
              "p_drogas":2,
              "p_empleo":82,
        }
        saveDiputado('de-santa-ana-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22535,
              intervenciones: 11,
              palabras: 14312,
              "p_terrorismo":130,
              "p_infraestructuras":4,
              "p_economía":7520,
              "p_pensiones":12,
              "p_justicia":18,
              "p_empleo":328,
              "p_clase politica":156,
        }
        saveDiputado('ocaña-y-perez-de-tudela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22567,
              intervenciones: 38,
              palabras: 20358,
              "p_economía":1504,
              "p_terrorismo":295,
              "p_justicia":36,
              "p_clase politica":26,
              "p_inseguridad":24,
              "p_inmigracion":96,
              "p_salud y sanidad":3,
              "p_educacion":25,
              "p_medioambiente":2,
              "p_vivienda":5,
              "p_pensiones":3,
        }
        saveDiputado('juanes-barciela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22700,
              intervenciones: 14,
              palabras: 19398,
              "p_terrorismo":170,
              "p_salud y sanidad":294,
              "p_economía":2726,
              "p_educacion":30,
              "p_pensiones":3,
              "p_infraestructuras":8,
              "p_justicia":1,
        }
        saveDiputado('sanchez-naranjo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22845,
              intervenciones: 63,
              palabras: 19957,
              "p_terrorismo":140,
              "p_economía":1739,
              "p_justicia":4,
              "p_infraestructuras":11,
              "p_educacion":15,
              "p_empleo":656,
              "p_vivienda":5,
              "p_pensiones":3,
        }
        saveDiputado('sanchez-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 22922,
              intervenciones: 40,
              palabras: 20238,
              "p_terrorismo":125,
              "p_infraestructuras":5,
              "p_economía":1692,
              "p_pensiones":9,
              "p_salud y sanidad":51,
              "p_empleo":164,
              "p_inmigracion":396,
              "p_drogas":1,
              "p_educacion":40,
              "p_medioambiente":1,
        }
        saveDiputado('esteve-ortega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23092,
              intervenciones: 47,
              palabras: 21261,
              "p_terrorismo":210,
              "p_empleo":164,
              "p_infraestructuras":17,
              "p_medioambiente":135,
              "p_economía":1034,
              "p_educacion":30,
              "p_justicia":2,
              "p_racismo":1,
              "p_salud y sanidad":3,
        }
        saveDiputado('sanchez-ramos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23204,
              intervenciones: 42,
              palabras: 19889,
              "p_economía":2538,
              "p_terrorismo":110,
              "p_infraestructuras":3,
              "p_vivienda":5,
              "p_salud y sanidad":3,
              "p_empleo":410,
              "p_clase politica":26,
              "p_educacion":10,
        }
        saveDiputado('moreno-bustos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23382,
              intervenciones: 86,
              palabras: 22158,
              "p_terrorismo":275,
              "p_economía":423,
              "p_medioambiente":3,
              "p_educacion":35,
              "p_inseguridad":32,
              "p_justicia":7,
              "p_pensiones":6,
              "p_infraestructuras":13,
        }
        saveDiputado('fernandez-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23460,
              intervenciones: 39,
              palabras: 21178,
              "p_terrorismo":225,
              "p_infraestructuras":15,
              "p_economía":1551,
              "p_medioambiente":1,
              "p_salud y sanidad":117,
              "p_jueventud":2,
              "p_justicia":11,
              "p_pensiones":15,
              "p_clase politica":26,
              "p_inmigracion":72,
              "p_educacion":20,
              "p_inseguridad":32,
        }
        saveDiputado('arnaiz-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23572,
              intervenciones: 66,
              palabras: 20128,
              "p_terrorismo":230,
              "p_salud y sanidad":501,
              "p_economía":1880,
              "p_educacion":90,
              "p_justicia":1,
              "p_empleo":410,
              "p_infraestructuras":2,
        }
        saveDiputado('mingo-zapatero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23751,
              intervenciones: 32,
              palabras: 20606,
              "p_economía":2820,
              "p_justicia":49,
              "p_terrorismo":105,
              "p_salud y sanidad":3,
              "p_medioambiente":1,
              "p_infraestructuras":1,
              "p_pensiones":6,
        }
        saveDiputado('lasarte-iribarren', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23771,
              intervenciones: 33,
              palabras: 20796,
              "p_terrorismo":170,
              "p_economía":2444,
              "p_justicia":6,
              "p_educacion":85,
              "p_medioambiente":2,
              "p_infraestructuras":21,
              "p_empleo":82,
        }
        saveDiputado('fernandez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23775,
              intervenciones: 27,
              palabras: 18432,
              "p_terrorismo":115,
              "p_infraestructuras":9,
              "p_salud y sanidad":30,
              "p_economía":4747,
              "p_educacion":10,
              "p_justicia":19,
              "p_clase politica":26,
              "p_empleo":246,
              "p_pensiones":6,
        }
        saveDiputado('fernandez-iruela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23854,
              intervenciones: 88,
              palabras: 21469,
              "p_terrorismo":175,
              "p_infraestructuras":27,
              "p_economía":846,
              "p_educacion":40,
              "p_justicia":11,
              "p_empleo":738,
              "p_medioambiente":2,
              "p_clase politica":52,
              "p_pensiones":6,
              "p_inseguridad":48,
        }
        saveDiputado('villalobos-talero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 23955,
              intervenciones: 36,
              palabras: 21880,
              "p_terrorismo":205,
              "p_economía":1551,
              "p_educacion":55,
              "p_medioambiente":77,
              "p_infraestructuras":6,
              "p_justicia":1,
        }
        saveDiputado('martin-fragueiro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 24397,
              intervenciones: 36,
              palabras: 22612,
              "p_terrorismo":190,
              "p_economía":1222,
              "p_educacion":75,
              "p_salud y sanidad":21,
              "p_medioambiente":1,
              "p_infraestructuras":9,
              "p_vivienda":5,
              "p_empleo":82,
        }
        saveDiputado('muñoz-santamaria', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 24472,
              intervenciones: 330,
              palabras: 21793,
              "p_terrorismo":160,
              "p_vivienda":105,
              "p_salud y sanidad":129,
              "p_economía":611,
              "p_medioambiente":4,
              "p_educacion":15,
              "p_justicia":2,
              "p_infraestructuras":3,
        }
        saveDiputado('corral-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 24881,
              intervenciones: 46,
              palabras: 23576,
              "p_terrorismo":265,
              "p_economía":611,
              "p_educacion":10,
              "p_empleo":164,
              "p_inseguridad":8,
              "p_justicia":3,
              "p_jueventud":4,
              "p_vivienda":10,
        }
        saveDiputado('cortes-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25322,
              intervenciones: 39,
              palabras: 23013,
              "p_empleo":82,
              "p_terrorismo":215,
              "p_infraestructuras":7,
              "p_salud y sanidad":423,
              "p_educacion":15,
              "p_economía":1363,
              "p_pensiones":9,
        }
        saveDiputado('martin-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25363,
              intervenciones: 36,
              palabras: 24040,
              "p_salud y sanidad":201,
              "p_economía":376,
              "p_terrorismo":210,
              "p_medioambiente":2,
              "p_inseguridad":8,
              "p_infraestructuras":4,
              "p_nacionalismos":1,
              "p_empleo":328,
              "p_educacion":10,
              "p_pensiones":3,
        }
        saveDiputado('cervera-soto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25458,
              intervenciones: 21,
              palabras: 20466,
              "p_terrorismo":170,
              "p_economía":3807,
              "p_educacion":655,
              "p_jueventud":6,
              "p_justicia":3,
              "p_empleo":246,
        }
        saveDiputado('almunia-badia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25471,
              intervenciones: 26,
              palabras: 21748,
              "p_terrorismo":120,
              "p_economía":3008,
              "p_salud y sanidad":18,
              "p_infraestructuras":12,
              "p_clase politica":286,
              "p_justicia":48,
              "p_pensiones":18,
              "p_empleo":82,
              "p_medioambiente":1,
        }
        saveDiputado('marmol-peñalver', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25617,
              intervenciones: 65,
              palabras: 21148,
              "p_empleo":410,
              "p_terrorismo":395,
              "p_salud y sanidad":6,
              "p_educacion":110,
              "p_economía":3149,
              "p_pensiones":57,
              "p_medioambiente":1,
              "p_infraestructuras":1,
              "p_vivienda":15,
        }
        saveDiputado('nasarre-goicoechea', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25675,
              intervenciones: 21,
              palabras: 22265,
              "p_terrorismo":305,
              "p_educacion":1825,
              "p_economía":1081,
              "p_salud y sanidad":9,
              "p_medioambiente":3,
              "p_empleo":82,
        }
        saveDiputado('rubiralta-i-alcañiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25706,
              intervenciones: 58,
              palabras: 23579,
              "p_terrorismo":150,
              "p_infraestructuras":13,
              "p_economía":1269,
              "p_justicia":39,
              "p_inseguridad":64,
              "p_empleo":246,
              "p_guerra":1,
              "p_clase politica":26,
              "p_salud y sanidad":3,
              "p_pensiones":6,
              "p_educacion":20,
        }
        saveDiputado('garcia-tizon-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 25732,
              intervenciones: 33,
              palabras: 24357,
              "p_terrorismo":255,
              "p_infraestructuras":9,
              "p_economía":846,
              "p_educacion":95,
              "p_justicia":2,
              "p_medioambiente":3,
        }
        saveDiputado('marin-uribe', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26112,
              intervenciones: 30,
              palabras: 23321,
              "p_terrorismo":145,
              "p_economía":2021,
              "p_justicia":9,
              "p_infraestructuras":10,
              "p_salud y sanidad":21,
              "p_racismo":3,
              "p_educacion":40,
              "p_empleo":328,
              "p_jueventud":10,
              "p_medioambiente":1,
              "p_inseguridad":8,
              "p_inmigracion":24,
              "p_vivienda":20,
              "p_violencia machista":1,
        }
        saveDiputado('mendez-guillen', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26167,
              intervenciones: 43,
              palabras: 23009,
              "p_terrorismo":190,
              "p_economía":2538,
              "p_educacion":25,
              "p_empleo":82,
              "p_infraestructuras":28,
              "p_pensiones":9,
              "p_salud y sanidad":6,
              "p_vivienda":5,
              "p_justicia":6,
              "p_jueventud":2,
              "p_clase politica":52,
        }
        saveDiputado('bar-cendon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26247,
              intervenciones: 35,
              palabras: 25445,
              "p_terrorismo":80,
              "p_infraestructuras":38,
              "p_vivienda":20,
              "p_salud y sanidad":21,
              "p_economía":423,
              "p_medioambiente":35,
              "p_educacion":10,
        }
        saveDiputado('valles-vives', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26308,
              intervenciones: 47,
              palabras: 24594,
              "p_empleo":164,
              "p_terrorismo":185,
              "p_infraestructuras":27,
              "p_economía":1034,
              "p_jueventud":6,
              "p_salud y sanidad":9,
              "p_educacion":45,
              "p_inseguridad":8,
              "p_medioambiente":1,
        }
        saveDiputado('corcuera-plaza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26412,
              intervenciones: 21,
              palabras: 24164,
              "p_terrorismo":190,
              "p_salud y sanidad":51,
              "p_pensiones":15,
              "p_educacion":50,
              "p_empleo":82,
              "p_economía":1739,
              "p_justicia":9,
              "p_infraestructuras":7,
        }
        saveDiputado('moza-zapatero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26549,
              intervenciones: 45,
              palabras: 25036,
              "p_justicia":18,
              "p_terrorismo":165,
              "p_infraestructuras":20,
              "p_economía":658,
              "p_educacion":90,
              "p_empleo":328,
              "p_salud y sanidad":9,
        }
        saveDiputado('saez-jubero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26705,
              intervenciones: 39,
              palabras: 21593,
              "p_terrorismo":420,
              "p_economía":4042,
              "p_infraestructuras":6,
              "p_medioambiente":7,
              "p_empleo":410,
              "p_educacion":10,
              "p_justicia":5,
              "p_jueventud":6,
              "p_salud y sanidad":3,
              "p_inseguridad":8,
        }
        saveDiputado('fajarnes-ribas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 26871,
              intervenciones: 61,
              palabras: 24307,
              "p_economía":1175,
              "p_terrorismo":195,
              "p_empleo":820,
              "p_educacion":30,
              "p_salud y sanidad":9,
              "p_justicia":9,
              "p_medioambiente":2,
              "p_infraestructuras":8,
              "p_inseguridad":8,
              "p_pensiones":3,
        }
        saveDiputado('mariscal-anaya', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 27433,
              intervenciones: 45,
              palabras: 24137,
              "p_empleo":492,
              "p_terrorismo":245,
              "p_salud y sanidad":228,
              "p_infraestructuras":10,
              "p_medioambiente":43,
              "p_economía":1739,
              "p_educacion":25,
              "p_justicia":1,
              "p_inmigracion":288,
        }
        saveDiputado('chacon-gutierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 27513,
              intervenciones: 40,
              palabras: 23908,
              "p_terrorismo":140,
              "p_infraestructuras":35,
              "p_economía":2773,
              "p_educacion":20,
              "p_salud y sanidad":39,
              "p_pensiones":39,
              "p_medioambiente":3,
              "p_empleo":328,
              "p_justicia":2,
              "p_clase politica":26,
        }
        saveDiputado('perez-dominguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 27536,
              intervenciones: 11,
              palabras: 23171,
              "p_terrorismo":245,
              "p_infraestructuras":3,
              "p_salud y sanidad":99,
              "p_economía":3619,
              "p_pensiones":6,
              "p_educacion":335,
              "p_guerra":1,
              "p_jueventud":2,
        }
        saveDiputado('san-jose-villace', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 27771,
              intervenciones: 51,
              palabras: 26383,
              "p_terrorismo":265,
              "p_economía":564,
              "p_jueventud":2,
              "p_educacion":115,
              "p_inseguridad":40,
              "p_violencia machista":6,
              "p_infraestructuras":8,
              "p_salud y sanidad":45,
              "p_justicia":8,
              "p_inmigracion":72,
              "p_medioambiente":2,
              "p_pensiones":6,
        }
        saveDiputado('medina-teva', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 27974,
              intervenciones: 57,
              palabras: 25529,
              "p_terrorismo":190,
              "p_economía":1786,
              "p_justicia":29,
              "p_vivienda":10,
              "p_medioambiente":6,
              "p_salud y sanidad":9,
              "p_inmigracion":60,
              "p_inseguridad":40,
              "p_infraestructuras":3,
              "p_clase politica":26,
              "p_drogas":1,
        }
        saveDiputado('ferrer-rosello', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 28172,
              intervenciones: 47,
              palabras: 25770,
              "p_salud y sanidad":258,
              "p_economía":1692,
              "p_terrorismo":145,
              "p_inseguridad":8,
              "p_educacion":60,
              "p_medioambiente":1,
              "p_infraestructuras":2,
              "p_justicia":1,
        }
        saveDiputado('fidalgo-francisco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 28747,
              intervenciones: 20,
              palabras: 26639,
              "p_terrorismo":220,
              "p_economía":1645,
              "p_clase politica":26,
              "p_medioambiente":35,
              "p_salud y sanidad":54,
              "p_educacion":25,
              "p_infraestructuras":3,
        }
        saveDiputado('villauriz-iglesias', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 28811,
              intervenciones: 56,
              palabras: 26260,
              "p_terrorismo":205,
              "p_infraestructuras":59,
              "p_economía":1974,
              "p_medioambiente":4,
              "p_justicia":3,
              "p_educacion":15,
              "p_drogas":2,
              "p_pensiones":9,
        }
        saveDiputado('de-la-encina-ortega', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29108,
              intervenciones: 61,
              palabras: 27444,
              "p_inseguridad":120,
              "p_justicia":21,
              "p_jueventud":4,
              "p_terrorismo":190,
              "p_economía":470,
              "p_inmigracion":216,
              "p_educacion":60,
              "p_medioambiente":6,
              "p_infraestructuras":5,
              "p_racismo":2,
              "p_empleo":246,
              "p_guerra":2,
              "p_pensiones":6,
              "p_vivienda":5,
              "p_salud y sanidad":6,
        }
        saveDiputado('camarero-benitez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29536,
              intervenciones: 50,
              palabras: 23763,
              "p_terrorismo":345,
              "p_economía":3431,
              "p_educacion":55,
              "p_jueventud":32,
              "p_medioambiente":1,
              "p_justicia":3,
              "p_pensiones":6,
              "p_vivienda":10,
              "p_empleo":1640,
        }
        saveDiputado('uriarte-ayala', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29537,
              intervenciones: 47,
              palabras: 26742,
              "p_terrorismo":245,
              "p_salud y sanidad":3,
              "p_economía":1269,
              "p_inmigracion":768,
              "p_infraestructuras":94,
              "p_educacion":10,
              "p_pensiones":3,
              "p_empleo":164,
              "p_medioambiente":2,
              "p_racismo":2,
        }
        saveDiputado('gutierrez-del-castillo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29599,
              intervenciones: 30,
              palabras: 28284,
              "p_terrorismo":330,
              "p_medioambiente":46,
              "p_economía":752,
              "p_educacion":10,
              "p_infraestructuras":7,
              "p_salud y sanidad":15,
              "p_justicia":5,
        }
        saveDiputado('ribera-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29602,
              intervenciones: 57,
              palabras: 28094,
              "p_terrorismo":45,
              "p_infraestructuras":21,
              "p_economía":940,
              "p_justicia":3,
              "p_educacion":110,
              "p_salud y sanidad":9,
              "p_medioambiente":6,
              "p_jueventud":2,
              "p_vivienda":5,
              "p_empleo":82,
        }
        saveDiputado('souviron-garcia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29779,
              intervenciones: 19,
              palabras: 27077,
              "p_terrorismo":250,
              "p_economía":1880,
              "p_inseguridad":16,
              "p_justicia":3,
              "p_medioambiente":6,
              "p_infraestructuras":1,
              "p_guerra":11,
              "p_educacion":30,
              "p_empleo":410,
        }
        saveDiputado('iranzo-gutierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 29960,
              intervenciones: 97,
              palabras: 28548,
              "p_terrorismo":150,
              "p_justicia":4,
              "p_infraestructuras":80,
              "p_economía":423,
              "p_empleo":246,
              "p_educacion":5,
              "p_medioambiente":12,
              "p_guerra":1,
              "p_salud y sanidad":6,
        }
        saveDiputado('alvarez-arza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 30097,
              intervenciones: 57,
              palabras: 26406,
              "p_terrorismo":180,
              "p_justicia":18,
              "p_inseguridad":16,
              "p_salud y sanidad":24,
              "p_economía":1880,
              "p_empleo":1148,
              "p_infraestructuras":13,
              "p_jueventud":2,
              "p_educacion":75,
              "p_vivienda":15,
              "p_medioambiente":3,
              "p_clase politica":26,
              "p_pensiones":6,
        }
        saveDiputado('jauregui-atondo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 30361,
              intervenciones: 67,
              palabras: 27837,
              "p_empleo":492,
              "p_terrorismo":355,
              "p_infraestructuras":7,
              "p_economía":1269,
              "p_medioambiente":36,
              "p_educacion":5,
              "p_justicia":6,
              "p_salud y sanidad":3,
              "p_vivienda":10,
              "p_pensiones":6,
        }
        saveDiputado('de-lara-carbo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 30407,
              intervenciones: 57,
              palabras: 24621,
              "p_terrorismo":230,
              "p_infraestructuras":23,
              "p_salud y sanidad":39,
              "p_economía":4512,
              "p_medioambiente":1,
              "p_empleo":656,
              "p_educacion":25,
              "p_justicia":8,
              "p_jueventud":2,
              "p_vivienda":5,
        }
        saveDiputado('salom-coll', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 30607,
              intervenciones: 43,
              palabras: 28592,
              "p_terrorismo":185,
              "p_economía":846,
              "p_empleo":492,
              "p_vivienda":15,
              "p_educacion":245,
              "p_inseguridad":8,
              "p_salud y sanidad":6,
              "p_justicia":2,
              "p_infraestructuras":1,
        }
        saveDiputado('bañuls-ros', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 30682,
              intervenciones: 51,
              palabras: 28160,
              "p_inseguridad":8,
              "p_terrorismo":210,
              "p_racismo":1,
              "p_violencia machista":1,
              "p_economía":1175,
              "p_infraestructuras":56,
              "p_educacion":425,
              "p_jueventud":2,
              "p_medioambiente":3,
              "p_empleo":328,
              "p_justicia":6,
              "p_clase politica":52,
        }
        saveDiputado('pezzi-cereto', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 31079,
              intervenciones: 56,
              palabras: 25536,
              "p_inseguridad":32,
              "p_economía":1880,
              "p_pensiones":12,
              "p_terrorismo":150,
              "p_medioambiente":13,
              "p_nacionalismos":3,
              "p_empleo":3034,
              "p_educacion":80,
              "p_vivienda":10,
              "p_infraestructuras":7,
              "p_inmigracion":24,
              "p_salud y sanidad":18,
        }
        saveDiputado('alonso-aranegui', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 31449,
              intervenciones: 44,
              palabras: 28776,
              "p_terrorismo":215,
              "p_economía":1927,
              "p_pensiones":6,
              "p_educacion":210,
              "p_salud y sanidad":9,
              "p_medioambiente":1,
              "p_empleo":82,
              "p_infraestructuras":1,
              "p_justicia":2,
        }
        saveDiputado('del-palacio-tascon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 31494,
              intervenciones: 65,
              palabras: 28925,
              "p_terrorismo":90,
              "p_justicia":7,
              "p_violencia machista":11,
              "p_salud y sanidad":102,
              "p_empleo":328,
              "p_vivienda":10,
              "p_jueventud":4,
              "p_economía":1598,
              "p_medioambiente":2,
              "p_educacion":10,
              "p_infraestructuras":2,
              "p_inseguridad":56,
              "p_inmigracion":24,
        }
        saveDiputado('monton-gimenez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 32064,
              intervenciones: 43,
              palabras: 30114,
              "p_terrorismo":330,
              "p_justicia":2,
              "p_infraestructuras":5,
              "p_salud y sanidad":36,
              "p_economía":940,
              "p_educacion":335,
              "p_medioambiente":4,
              "p_empleo":82,
              "p_guerra":1,
        }
        saveDiputado('petriz-calvo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 32192,
              intervenciones: 77,
              palabras: 25285,
              "p_terrorismo":175,
              "p_vivienda":5,
              "p_justicia":27,
              "p_economía":4747,
              "p_educacion":35,
              "p_empleo":1476,
              "p_pensiones":3,
              "p_clase politica":52,
              "p_medioambiente":2,
        }
        saveDiputado('aguirre-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 32407,
              intervenciones: 53,
              palabras: 29660,
              "p_terrorismo":325,
              "p_economía":2115,
              "p_salud y sanidad":6,
              "p_justicia":15,
              "p_medioambiente":2,
              "p_infraestructuras":2,
              "p_educacion":10,
              "p_guerra":2,
              "p_vivienda":5,
        }
        saveDiputado('moscoso-del-prado-hernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 32824,
              intervenciones: 43,
              palabras: 30572,
              "p_terrorismo":210,
              "p_economía":1363,
              "p_justicia":2,
              "p_infraestructuras":33,
              "p_salud y sanidad":30,
              "p_educacion":145,
              "p_empleo":246,
              "p_medioambiente":8,
        }
        saveDiputado('tabuyo-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 33079,
              intervenciones: 59,
              palabras: 30360,
              "p_educacion":1100,
              "p_economía":940,
              "p_empleo":82,
              "p_terrorismo":290,
              "p_infraestructuras":1,
              "p_inseguridad":8,
              "p_racismo":1,
              "p_guerra":1,
              "p_justicia":1,
        }
        saveDiputado('don-adolfo-luis', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 33393,
              intervenciones: 33,
              palabras: 25868,
              "p_empleo":246,
              "p_terrorismo":215,
              "p_economía":6815,
              "p_justicia":21,
              "p_medioambiente":3,
              "p_vivienda":25,
              "p_infraestructuras":14,
              "p_educacion":15,
              "p_salud y sanidad":6,
        }
        saveDiputado('rodriguez-piñero-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 33542,
              intervenciones: 64,
              palabras: 31037,
              "p_terrorismo":250,
              "p_infraestructuras":119,
              "p_economía":1786,
              "p_inseguridad":8,
              "p_salud y sanidad":3,
              "p_educacion":5,
              "p_medioambiente":4,
              "p_vivienda":10,
        }
        saveDiputado('cruz-villalon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 33592,
              intervenciones: 42,
              palabras: 30413,
              "p_terrorismo":375,
              "p_justicia":59,
              "p_salud y sanidad":15,
              "p_economía":1786,
              "p_educacion":175,
              "p_infraestructuras":8,
              "p_medioambiente":4,
              "p_vivienda":30,
              "p_empleo":492,
              "p_pensiones":15,
              "p_jueventud":2,
              "p_inseguridad":8,
        }
        saveDiputado('montserrat-montserrat', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 33785,
              intervenciones: 68,
              palabras: 30333,
              "p_terrorismo":320,
              "p_educacion":590,
              "p_salud y sanidad":33,
              "p_economía":2162,
              "p_infraestructuras":4,
              "p_medioambiente":3,
        }
        saveDiputado('martinez-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 34160,
              intervenciones: 43,
              palabras: 27893,
              "p_terrorismo":435,
              "p_economía":5452,
              "p_infraestructuras":1,
              "p_educacion":25,
              "p_vivienda":10,
              "p_guerra":34,
              "p_nacionalismos":1,
              "p_justicia":9,
              "p_empleo":82,
              "p_salud y sanidad":3,
        }
        saveDiputado('sanchez-perez-castejon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 34222,
              intervenciones: 29,
              palabras: 27978,
              "p_terrorismo":160,
              "p_vivienda":10,
              "p_economía":4888,
              "p_justicia":23,
              "p_educacion":70,
              "p_empleo":902,
              "p_salud y sanidad":3,
              "p_inseguridad":16,
              "p_clase politica":26,
              "p_medioambiente":1,
        }
        saveDiputado('garcia-legaz-ponce', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 34708,
              intervenciones: 69,
              palabras: 32572,
              "p_economía":799,
              "p_terrorismo":170,
              "p_justicia":12,
              "p_empleo":492,
              "p_pensiones":42,
              "p_infraestructuras":15,
              "p_salud y sanidad":12,
              "p_educacion":10,
              "p_medioambiente":4,
              "p_inseguridad":56,
              "p_racismo":16,
              "p_inmigracion":156,
              "p_violencia machista":5,
              "p_jueventud":2,
        }
        saveDiputado('quintanilla-barba', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 35066,
              intervenciones: 43,
              palabras: 33148,
              "p_guerra":56,
              "p_terrorismo":300,
              "p_economía":1222,
              "p_salud y sanidad":12,
              "p_justicia":14,
              "p_infraestructuras":3,
              "p_vivienda":10,
              "p_educacion":20,
              "p_medioambiente":5,
              "p_inseguridad":8,
              "p_inmigracion":24,
              "p_pensiones":3,
              "p_clase politica":26,
        }
        saveDiputado('valenciano-martinez-orozco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 35168,
              intervenciones: 41,
              palabras: 32192,
              "p_terrorismo":225,
              "p_infraestructuras":14,
              "p_economía":2491,
              "p_educacion":25,
              "p_medioambiente":4,
              "p_justicia":9,
              "p_salud y sanidad":3,
        }
        saveDiputado('larrosa-pique', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 35718,
              intervenciones: 90,
              palabras: 30664,
              "p_educacion":80,
              "p_economía":3337,
              "p_empleo":738,
              "p_salud y sanidad":39,
              "p_terrorismo":160,
              "p_medioambiente":6,
              "p_clase politica":208,
              "p_vivienda":15,
              "p_inseguridad":16,
              "p_infraestructuras":4,
              "p_nacionalismos":1,
        }
        saveDiputado('nadal-i-aymerich', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 35957,
              intervenciones: 49,
              palabras: 32657,
              "p_terrorismo":185,
              "p_economía":2303,
              "p_educacion":170,
              "p_infraestructuras":23,
              "p_justicia":22,
              "p_inmigracion":312,
              "p_medioambiente":2,
              "p_salud y sanidad":27,
              "p_pensiones":3,
              "p_inseguridad":8,
        }
        saveDiputado('martinez-lozano', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 35960,
              intervenciones: 53,
              palabras: 33540,
              "p_terrorismo":210,
              "p_inseguridad":8,
              "p_infraestructuras":4,
              "p_justicia":20,
              "p_salud y sanidad":39,
              "p_educacion":50,
              "p_medioambiente":2,
              "p_empleo":738,
              "p_economía":1081,
              "p_pensiones":3,
        }
        saveDiputado('vaño-ferre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 36263,
              intervenciones: 91,
              palabras: 31781,
              "p_terrorismo":285,
              "p_economía":3196,
              "p_medioambiente":26,
              "p_educacion":10,
              "p_infraestructuras":4,
              "p_justicia":2,
              "p_empleo":492,
              "p_pensiones":12,
        }
        saveDiputado('floriano-corrales', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 36373,
              intervenciones: 88,
              palabras: 34500,
              "p_inseguridad":56,
              "p_terrorismo":145,
              "p_infraestructuras":7,
              "p_justicia":11,
              "p_educacion":160,
              "p_salud y sanidad":81,
              "p_economía":846,
              "p_jueventud":12,
              "p_vivienda":10,
              "p_violencia machista":5,
              "p_clase politica":26,
              "p_inmigracion":72,
              "p_medioambiente":2,
        }
        saveDiputado('aido-almagro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 36821,
              intervenciones: 46,
              palabras: 31574,
              "p_terrorismo":250,
              "p_economía":4465,
              "p_justicia":10,
              "p_medioambiente":2,
              "p_guerra":15,
              "p_educacion":45,
              "p_inseguridad":24,
              "p_salud y sanidad":9,
              "p_clase politica":26,
              "p_empleo":164,
              "p_infraestructuras":1,
              "p_jueventud":4,
              "p_nacionalismos":2,
        }
        saveDiputado('perez-tapias', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 37092,
              intervenciones: 57,
              palabras: 33660,
              "p_inseguridad":40,
              "p_terrorismo":580,
              "p_justicia":5,
              "p_economía":2162,
              "p_empleo":328,
              "p_salud y sanidad":18,
              "p_infraestructuras":9,
              "p_medioambiente":5,
        }
        saveDiputado('gonzalez-serna', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 37201,
              intervenciones: 102,
              palabras: 33353,
              "p_terrorismo":160,
              "p_economía":2162,
              "p_pensiones":297,
              "p_salud y sanidad":15,
              "p_educacion":20,
              "p_justicia":5,
              "p_medioambiente":2,
              "p_infraestructuras":11,
              "p_empleo":656,
              "p_vivienda":10,
        }
        saveDiputado('lopez-i-chamosa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 38643,
              intervenciones: 77,
              palabras: 34045,
              "p_infraestructuras":10,
              "p_justicia":31,
              "p_economía":2256,
              "p_terrorismo":280,
              "p_jueventud":2,
              "p_salud y sanidad":27,
              "p_inmigracion":372,
              "p_educacion":10,
              "p_empleo":1148,
              "p_medioambiente":6,
              "p_inseguridad":32,
              "p_clase politica":26,
              "p_vivienda":10,
              "p_pensiones":3,
        }
        saveDiputado('navarro-cruz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 39616,
              intervenciones: 77,
              palabras: 36939,
              "p_terrorismo":270,
              "p_clase politica":130,
              "p_justicia":226,
              "p_educacion":50,
              "p_infraestructuras":4,
              "p_vivienda":10,
              "p_medioambiente":3,
              "p_economía":1128,
              "p_salud y sanidad":3,
              "p_inseguridad":56,
              "p_jueventud":2,
              "p_empleo":410,
        }
        saveDiputado('trillo-figueroa-martinez-conde', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 39688,
              intervenciones: 81,
              palabras: 34583,
              "p_empleo":1558,
              "p_terrorismo":360,
              "p_economía":2538,
              "p_salud y sanidad":24,
              "p_justicia":14,
              "p_educacion":75,
              "p_inmigracion":96,
              "p_infraestructuras":6,
              "p_clase politica":26,
              "p_pensiones":3,
        }
        saveDiputado('alvarez-arenas-cisneros', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 40349,
              intervenciones: 59,
              palabras: 36732,
              "p_terrorismo":900,
              "p_salud y sanidad":330,
              "p_economía":1410,
              "p_medioambiente":1,
              "p_educacion":55,
              "p_infraestructuras":9,
              "p_inmigracion":192,
              "p_pensiones":6,
              "p_inseguridad":8,
              "p_empleo":410,
              "p_violencia machista":1,
        }
        saveDiputado('gutierrez-molina', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 40617,
              intervenciones: 68,
              palabras: 36002,
              "p_infraestructuras":21,
              "p_terrorismo":250,
              "p_economía":2867,
              "p_pensiones":45,
              "p_medioambiente":1,
              "p_salud y sanidad":39,
              "p_vivienda":5,
              "p_justicia":30,
              "p_empleo":984,
              "p_educacion":5,
              "p_clase politica":26,
              "p_jueventud":2,
        }
        saveDiputado('azpiroz-villar', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 40723,
              intervenciones: 63,
              palabras: 36915,
              "p_terrorismo":255,
              "p_economía":2726,
              "p_justicia":11,
              "p_educacion":160,
              "p_empleo":328,
              "p_salud y sanidad":3,
              "p_nacionalismos":1,
              "p_medioambiente":3,
              "p_vivienda":5,
              "p_infraestructuras":1,
        }
        saveDiputado('lassalle-ruiz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 41232,
              intervenciones: 181,
              palabras: 27223,
              "p_terrorismo":235,
              "p_economía":9588,
              "p_empleo":3034,
              "p_infraestructuras":12,
              "p_salud y sanidad":12,
              "p_educacion":40,
              "p_justicia":6,
              "p_clase politica":130,
              "p_pensiones":42,
              "p_vivienda":5,
        }
        saveDiputado('martinez-pujalte-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 41966,
              intervenciones: 69,
              palabras: 35716,
              "p_vivienda":560,
              "p_jueventud":8,
              "p_educacion":70,
              "p_terrorismo":145,
              "p_economía":4747,
              "p_infraestructuras":2,
              "p_salud y sanidad":12,
              "p_empleo":328,
              "p_justicia":2,
              "p_medioambiente":5,
              "p_clase politica":26,
        }
        saveDiputado('fuentes-pacheco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 42887,
              intervenciones: 21,
              palabras: 29226,
              "p_empleo":1066,
              "p_terrorismo":210,
              "p_infraestructuras":4,
              "p_economía":12173,
              "p_justicia":25,
              "p_educacion":40,
              "p_inseguridad":8,
              "p_pensiones":30,
        }
        saveDiputado('campa-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 43048,
              intervenciones: 42,
              palabras: 37389,
              "p_terrorismo":370,
              "p_infraestructuras":35,
              "p_salud y sanidad":36,
              "p_pensiones":108,
              "p_medioambiente":1,
              "p_economía":4371,
              "p_educacion":125,
              "p_justicia":11,
              "p_empleo":164,
              "p_clase politica":130,
              "p_racismo":9,
              "p_inmigracion":84,
              "p_vivienda":5,
        }
        saveDiputado('de-la-rocha-rubi', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 43263,
              intervenciones: 448,
              palabras: 39234,
              "p_inmigracion":168,
              "p_terrorismo":330,
              "p_economía":1034,
              "p_salud y sanidad":198,
              "p_educacion":40,
              "p_justicia":6,
              "p_guerra":9,
              "p_infraestructuras":3,
              "p_medioambiente":1,
        }
        saveDiputado('aburto-baselga', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45147,
              intervenciones: 94,
              palabras: 41549,
              "p_terrorismo":635,
              "p_salud y sanidad":9,
              "p_economía":2397,
              "p_medioambiente":13,
              "p_pensiones":18,
              "p_guerra":36,
              "p_jueventud":4,
              "p_educacion":5,
              "p_justicia":1,
              "p_infraestructuras":2,
              "p_inseguridad":8,
        }
        saveDiputado('cuadrado-bausela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45352,
              intervenciones: 72,
              palabras: 40520,
              "p_terrorismo":375,
              "p_salud y sanidad":738,
              "p_economía":3196,
              "p_justicia":5,
              "p_infraestructuras":8,
              "p_educacion":30,
              "p_inmigracion":24,
              "p_medioambiente":4,
              "p_jueventud":2,
              "p_inseguridad":8,
              "p_empleo":82,
        }
        saveDiputado('grande-pesquero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45835,
              intervenciones: 62,
              palabras: 36334,
              "p_empleo":1394,
              "p_terrorismo":200,
              "p_salud y sanidad":6,
              "p_economía":6815,
              "p_pensiones":84,
              "p_clase politica":520,
              "p_justicia":117,
              "p_educacion":40,
              "p_vivienda":10,
              "p_medioambiente":3,
              "p_infraestructuras":2,
        }
        saveDiputado('tome-muguruza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45921,
              intervenciones: 153,
              palabras: 42265,
              "p_terrorismo":460,
              "p_empleo":164,
              "p_economía":2162,
              "p_educacion":10,
              "p_guerra":29,
              "p_justicia":14,
              "p_infraestructuras":5,
              "p_vivienda":10,
              "p_medioambiente":3,
              "p_jueventud":4,
              "p_inseguridad":24,
              "p_salud y sanidad":6,
        }
        saveDiputado('rodriguez-salmones-cabeza', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 45928,
              intervenciones: 78,
              palabras: 42992,
              "p_terrorismo":415,
              "p_economía":1974,
              "p_justicia":5,
              "p_salud y sanidad":9,
              "p_medioambiente":5,
              "p_vivienda":40,
              "p_infraestructuras":6,
              "p_educacion":10,
              "p_empleo":82,
        }
        saveDiputado('puxeu-rocamora', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 46400,
              intervenciones: 84,
              palabras: 43126,
              "p_terrorismo":175,
              "p_infraestructuras":16,
              "p_salud y sanidad":18,
              "p_educacion":385,
              "p_economía":2068,
              "p_pensiones":12,
              "p_justicia":3,
              "p_jueventud":4,
              "p_inseguridad":8,
              "p_empleo":164,
              "p_medioambiente":1,
        }
        saveDiputado('cabrera-calvo-sotelo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 46581,
              intervenciones: 56,
              palabras: 42682,
              "p_terrorismo":275,
              "p_salud y sanidad":252,
              "p_economía":2867,
              "p_infraestructuras":37,
              "p_justicia":6,
              "p_violencia machista":3,
              "p_medioambiente":1,
              "p_inseguridad":32,
              "p_pensiones":39,
              "p_empleo":82,
              "p_vivienda":10,
              "p_educacion":15,
        }
        saveDiputado('pajin-iraola', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 46581,
              intervenciones: 48,
              palabras: 43213,
              "p_terrorismo":415,
              "p_infraestructuras":8,
              "p_salud y sanidad":120,
              "p_economía":2397,
              "p_justicia":20,
              "p_medioambiente":4,
              "p_inseguridad":72,
              "p_empleo":82,
              "p_educacion":10,
        }
        saveDiputado('gallizo-llamas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 46736,
              intervenciones: 86,
              palabras: 40956,
              "p_terrorismo":260,
              "p_infraestructuras":3,
              "p_medioambiente":5,
              "p_inseguridad":56,
              "p_salud y sanidad":36,
              "p_economía":2726,
              "p_empleo":2050,
              "p_educacion":160,
              "p_justicia":27,
              "p_inmigracion":24,
              "p_pensiones":3,
        }
        saveDiputado('moneo-diez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 47856,
              intervenciones: 62,
              palabras: 43126,
              "p_terrorismo":275,
              "p_economía":3995,
              "p_pensiones":12,
              "p_salud y sanidad":3,
              "p_educacion":10,
              "p_guerra":1,
              "p_empleo":82,
              "p_infraestructuras":1,
              "p_justicia":5,
              "p_medioambiente":2,
              "p_vivienda":10,
              "p_inmigracion":24,
        }
        saveDiputado('batet-lamaña', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 47901,
              intervenciones: 79,
              palabras: 43093,
              "p_terrorismo":430,
              "p_guerra":63,
              "p_economía":3055,
              "p_educacion":60,
              "p_medioambiente":3,
              "p_empleo":738,
              "p_salud y sanidad":18,
              "p_infraestructuras":9,
              "p_inseguridad":24,
              "p_justicia":8,
              "p_vivienda":5,
        }
        saveDiputado('pedret-i-grenzner', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 48048,
              intervenciones: 62,
              palabras: 42365,
              "p_terrorismo":455,
              "p_infraestructuras":1,
              "p_salud y sanidad":21,
              "p_educacion":40,
              "p_economía":4841,
              "p_justicia":5,
              "p_medioambiente":6,
              "p_jueventud":4,
        }
        saveDiputado('calabuig-rull', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 49382,
              intervenciones: 22,
              palabras: 36200,
              "p_terrorismo":405,
              "p_vivienda":65,
              "p_economía":11374,
              "p_justicia":22,
              "p_empleo":1148,
              "p_educacion":5,
              "p_nacionalismos":1,
              "p_infraestructuras":3,
              "p_pensiones":36,
              "p_inmigracion":12,
              "p_medioambiente":1,
        }
        saveDiputado('fernandez-ordoñez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50297,
              intervenciones: 89,
              palabras: 43503,
              "p_terrorismo":325,
              "p_economía":5546,
              "p_medioambiente":168,
              "p_infraestructuras":13,
              "p_salud y sanidad":6,
              "p_inseguridad":8,
              "p_educacion":30,
              "p_jueventud":2,
              "p_vivienda":5,
              "p_empleo":246,
        }
        saveDiputado('diaz-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50493,
              intervenciones: 56,
              palabras: 44904,
              "p_terrorismo":335,
              "p_salud y sanidad":1128,
              "p_economía":3760,
              "p_infraestructuras":36,
              "p_justicia":3,
              "p_educacion":30,
              "p_jueventud":4,
              "p_inmigracion":12,
              "p_medioambiente":1,
        }
        saveDiputado('martinez-olmos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50611,
              intervenciones: 117,
              palabras: 46998,
              "p_justicia":205,
              "p_medioambiente":3,
              "p_empleo":328,
              "p_terrorismo":305,
              "p_educacion":40,
              "p_economía":2021,
              "p_infraestructuras":6,
              "p_pensiones":9,
              "p_clase politica":78,
              "p_salud y sanidad":30,
              "p_violencia machista":2,
              "p_guerra":1,
        }
        saveDiputado('caamaño-dominguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 50717,
              intervenciones: 81,
              palabras: 47584,
              "p_terrorismo":415,
              "p_justicia":213,
              "p_jueventud":2,
              "p_educacion":10,
              "p_infraestructuras":6,
              "p_economía":1927,
              "p_salud y sanidad":12,
              "p_empleo":82,
              "p_clase politica":52,
              "p_medioambiente":1,
              "p_inseguridad":8,
        }
        saveDiputado('villarrubia-mediavilla', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 51014,
              intervenciones: 105,
              palabras: 46876,
              "p_terrorismo":290,
              "p_economía":2867,
              "p_infraestructuras":72,
              "p_pensiones":6,
              "p_medioambiente":3,
              "p_empleo":328,
              "p_justicia":14,
              "p_salud y sanidad":3,
              "p_educacion":30,
        }
        saveDiputado('delgado-arce', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 51014,
              intervenciones: 69,
              palabras: 46506,
              "p_terrorismo":560,
              "p_salud y sanidad":45,
              "p_economía":3525,
              "p_justicia":7,
              "p_medioambiente":25,
              "p_infraestructuras":1,
        }
        saveDiputado('moran-fernandez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 51143,
              intervenciones: 80,
              palabras: 45810,
              "p_educacion":1260,
              "p_terrorismo":230,
              "p_economía":3290,
              "p_justicia":6,
              "p_salud y sanidad":42,
              "p_empleo":82,
              "p_infraestructuras":1,
              "p_medioambiente":4,
              "p_vivienda":5,
              "p_pensiones":9,
              "p_jueventud":4,
        }
        saveDiputado('garmendia-mendizabal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 51227,
              intervenciones: 72,
              palabras: 42670,
              "p_terrorismo":370,
              "p_economía":7238,
              "p_salud y sanidad":15,
              "p_vivienda":25,
              "p_justicia":24,
              "p_clase politica":494,
              "p_pensiones":9,
              "p_medioambiente":16,
              "p_infraestructuras":4,
              "p_jueventud":2,
        }
        saveDiputado('alique-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 51327,
              intervenciones: 85,
              palabras: 38504,
              "p_economía":11327,
              "p_educacion":15,
              "p_empleo":492,
              "p_salud y sanidad":21,
              "p_justicia":27,
              "p_terrorismo":280,
              "p_guerra":25,
              "p_inseguridad":64,
              "p_inmigracion":72,
              "p_medioambiente":1,
              "p_infraestructuras":11,
              "p_pensiones":63,
        }
        saveDiputado('alonso-suarez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 52639,
              intervenciones: 57,
              palabras: 47659,
              "p_terrorismo":400,
              "p_inseguridad":80,
              "p_infraestructuras":17,
              "p_economía":3431,
              "p_justicia":23,
              "p_inmigracion":612,
              "p_medioambiente":4,
              "p_pensiones":3,
              "p_empleo":82,
              "p_salud y sanidad":3,
              "p_clase politica":26,
              "p_guerra":10,
              "p_racismo":2,
              "p_jueventud":2,
        }
        saveDiputado('camacho-vizcaino', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 53104,
              intervenciones: 267,
              palabras: 40659,
              "p_terrorismo":310,
              "p_infraestructuras":11,
              "p_pensiones":96,
              "p_justicia":20,
              "p_economía":6956,
              "p_empleo":3608,
              "p_guerra":2,
              "p_medioambiente":14,
              "p_inseguridad":8,
              "p_inmigracion":72,
              "p_salud y sanidad":12,
              "p_violencia machista":1,
        }
        saveDiputado('saenz-de-santamaria-anton', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 53586,
              intervenciones: 63,
              palabras: 47058,
              "p_terrorismo":240,
              "p_pensiones":330,
              "p_educacion":80,
              "p_infraestructuras":28,
              "p_economía":4888,
              "p_salud y sanidad":78,
              "p_empleo":492,
              "p_inmigracion":60,
              "p_vivienda":10,
              "p_justicia":7,
        }
        saveDiputado('sanchez-rubio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 53987,
              intervenciones: 122,
              palabras: 51121,
              "p_terrorismo":525,
              "p_economía":940,
              "p_justicia":9,
              "p_inmigracion":24,
              "p_educacion":400,
              "p_infraestructuras":15,
              "p_empleo":328,
              "p_medioambiente":10,
              "p_salud y sanidad":3,
              "p_jueventud":2,
        }
        saveDiputado('surroca-i-comas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 54591,
              intervenciones: 39,
              palabras: 44752,
              "p_terrorismo":215,
              "p_infraestructuras":64,
              "p_economía":8366,
              "p_pensiones":453,
              "p_salud y sanidad":45,
              "p_clase politica":52,
              "p_justicia":9,
              "p_inmigracion":96,
              "p_educacion":60,
              "p_medioambiente":2,
              "p_vivienda":35,
              "p_empleo":246,
              "p_guerra":1,
        }
        saveDiputado('granado-martinez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 55045,
              intervenciones: 87,
              palabras: 48868,
              "p_terrorismo":405,
              "p_educacion":80,
              "p_infraestructuras":42,
              "p_economía":4277,
              "p_empleo":738,
              "p_salud y sanidad":27,
              "p_medioambiente":6,
              "p_nacionalismos":1,
              "p_vivienda":40,
              "p_clase politica":26,
              "p_justicia":16,
              "p_pensiones":12,
              "p_inmigracion":72,
        }
        saveDiputado('gallego-burgos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 55064,
              intervenciones: 86,
              palabras: 44416,
              "p_terrorismo":330,
              "p_salud y sanidad":24,
              "p_economía":8413,
              "p_justicia":106,
              "p_empleo":902,
              "p_infraestructuras":8,
              "p_vivienda":80,
              "p_clase politica":286,
              "p_medioambiente":2,
              "p_pensiones":27,
              "p_educacion":40,
        }
        saveDiputado('colldeforns-i-sol', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 55595,
              intervenciones: 82,
              palabras: 50713,
              "p_terrorismo":275,
              "p_economía":1833,
              "p_educacion":2355,
              "p_salud y sanidad":9,
        }
        saveDiputado('gabilondo-pujol', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 55602,
              intervenciones: 95,
              palabras: 52578,
              "p_terrorismo":455,
              "p_economía":1175,
              "p_racismo":2,
              "p_inseguridad":40,
              "p_infraestructuras":11,
              "p_justicia":14,
              "p_violencia machista":1,
              "p_educacion":165,
              "p_inmigracion":540,
              "p_guerra":2,
              "p_medioambiente":7,
              "p_empleo":82,
              "p_salud y sanidad":6,
              "p_vivienda":20,
              "p_pensiones":3,
              "p_clase politica":26,
        }
        saveDiputado('velazquez-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 56047,
              intervenciones: 94,
              palabras: 53323,
              "p_terrorismo":395,
              "p_economía":1551,
              "p_inseguridad":88,
              "p_medioambiente":12,
              "p_infraestructuras":10,
              "p_guerra":57,
              "p_justicia":27,
              "p_clase politica":78,
              "p_pensiones":3,
              "p_nacionalismos":1,
              "p_salud y sanidad":9,
              "p_educacion":5,
              "p_drogas":1,
              "p_vivienda":5,
              "p_inmigracion":12,
        }
        saveDiputado('de-aristegui-san-roman', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 57037,
              intervenciones: 191,
              palabras: 47909,
              "p_empleo":984,
              "p_salud y sanidad":45,
              "p_economía":6298,
              "p_medioambiente":5,
              "p_terrorismo":250,
              "p_infraestructuras":9,
              "p_clase politica":520,
              "p_justicia":39,
              "p_pensiones":6,
              "p_educacion":10,
              "p_vivienda":5,
              "p_jueventud":2,
        }
        saveDiputado('chaves-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 57753,
              intervenciones: 69,
              palabras: 50860,
              "p_empleo":656,
              "p_terrorismo":580,
              "p_salud y sanidad":153,
              "p_economía":4559,
              "p_educacion":95,
              "p_clase politica":156,
              "p_pensiones":27,
              "p_infraestructuras":35,
              "p_medioambiente":19,
              "p_jueventud":2,
              "p_justicia":2,
              "p_inmigracion":264,
        }
        saveDiputado('do-campo-piñeiro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 58900,
              intervenciones: 128,
              palabras: 55316,
              "p_empleo":328,
              "p_terrorismo":570,
              "p_infraestructuras":108,
              "p_economía":1598,
              "p_medioambiente":19,
              "p_inseguridad":40,
              "p_salud y sanidad":54,
              "p_justicia":35,
              "p_inmigracion":144,
              "p_vivienda":35,
              "p_educacion":10,
              "p_pensiones":3,
        }
        saveDiputado('landaluce-calleja', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 59136,
              intervenciones: 106,
              palabras: 55383,
              "p_terrorismo":480,
              "p_economía":2491,
              "p_infraestructuras":139,
              "p_salud y sanidad":3,
              "p_empleo":82,
              "p_medioambiente":5,
              "p_educacion":20,
              "p_pensiones":3,
        }
        saveDiputado('morlan-gracia', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 59186,
              intervenciones: 91,
              palabras: 54004,
              "p_terrorismo":815,
              "p_infraestructuras":49,
              "p_economía":3478,
              "p_empleo":82,
              "p_guerra":27,
              "p_salud y sanidad":42,
              "p_educacion":15,
              "p_inmigracion":132,
              "p_inseguridad":24,
              "p_vivienda":25,
              "p_clase politica":26,
              "p_justicia":8,
              "p_jueventud":2,
              "p_medioambiente":2,
        }
        saveDiputado('ricoma-de-castellarnau', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 61501,
              intervenciones: 132,
              palabras: 50825,
              "p_terrorismo":380,
              "p_infraestructuras":9,
              "p_educacion":1060,
              "p_justicia":2,
              "p_medioambiente":3,
              "p_empleo":1066,
              "p_salud y sanidad":15,
              "p_economía":7473,
              "p_inseguridad":8,
        }
        saveDiputado('gomez-trinidad', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 62333,
              intervenciones: 99,
              palabras: 46965,
              "p_terrorismo":385,
              "p_economía":14053,
              "p_educacion":125,
              "p_justicia":56,
              "p_infraestructuras":8,
              "p_vivienda":30,
              "p_medioambiente":1,
              "p_salud y sanidad":12,
              "p_pensiones":21,
              "p_clase politica":182,
        }
        saveDiputado('gaston-menal', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 62410,
              intervenciones: 108,
              palabras: 53953,
              "p_terrorismo":535,
              "p_vivienda":10,
              "p_salud y sanidad":18,
              "p_educacion":50,
              "p_economía":7003,
              "p_justicia":7,
              "p_infraestructuras":116,
              "p_medioambiente":10,
              "p_guerra":1,
              "p_pensiones":3,
              "p_empleo":164,
        }
        saveDiputado('simancas-simancas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 63248,
              intervenciones: 219,
              palabras: 55496,
              "p_terrorismo":395,
              "p_justicia":25,
              "p_inmigracion":228,
              "p_salud y sanidad":27,
              "p_economía":5311,
              "p_educacion":75,
              "p_medioambiente":14,
              "p_infraestructuras":13,
              "p_pensiones":75,
              "p_jueventud":2,
              "p_empleo":492,
        }
        saveDiputado('fernandez-de-la-vega-sanz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 64851,
              intervenciones: 114,
              palabras: 53053,
              "p_pensiones":57,
              "p_justicia":11,
              "p_educacion":100,
              "p_medioambiente":1,
              "p_infraestructuras":77,
              "p_economía":7191,
              "p_terrorismo":480,
              "p_empleo":3198,
              "p_salud y sanidad":84,
              "p_vivienda":5,
              "p_inmigracion":24,
        }
        saveDiputado('mendez-monasterio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 66355,
              intervenciones: 160,
              palabras: 55526,
              "p_terrorismo":445,
              "p_economía":7473,
              "p_justicia":16,
              "p_empleo":1968,
              "p_salud y sanidad":27,
              "p_medioambiente":16,
              "p_clase politica":52,
              "p_infraestructuras":7,
              "p_pensiones":6,
              "p_jueventud":2,
              "p_inseguridad":16,
              "p_nacionalismos":1,
        }
        saveDiputado('llorens-torres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 67437,
              intervenciones: 128,
              palabras: 62977,
              "p_terrorismo":560,
              "p_infraestructuras":31,
              "p_economía":2444,
              "p_medioambiente":231,
              "p_empleo":492,
              "p_justicia":14,
              "p_educacion":20,
              "p_inseguridad":16,
              "p_salud y sanidad":12,
        }
        saveDiputado('garcia-diez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 67674,
              intervenciones: 157,
              palabras: 64371,
              "p_terrorismo":580,
              "p_educacion":145,
              "p_economía":893,
              "p_medioambiente":13,
              "p_infraestructuras":21,
              "p_guerra":120,
              "p_salud y sanidad":42,
              "p_justicia":10,
              "p_empleo":656,
              "p_drogas":1,
              "p_inseguridad":32,
              "p_vivienda":5,
        }
        saveDiputado('chacon-piqueras', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 67742,
              intervenciones: 123,
              palabras: 61234,
              "p_medioambiente":8,
              "p_inmigracion":36,
              "p_terrorismo":450,
              "p_infraestructuras":8,
              "p_vivienda":10,
              "p_economía":4512,
              "p_guerra":29,
              "p_justicia":23,
              "p_salud y sanidad":21,
              "p_educacion":30,
              "p_empleo":738,
              "p_clase politica":26,
              "p_nacionalismos":2,
        }
        saveDiputado('erkoreka-gervasio', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 68001,
              intervenciones: 146,
              palabras: 63586,
              "p_terrorismo":330,
              "p_empleo":410,
              "p_infraestructuras":14,
              "p_economía":2773,
              "p_medioambiente":74,
              "p_salud y sanidad":24,
              "p_justicia":14,
              "p_educacion":35,
              "p_pensiones":3,
              "p_inseguridad":8,
        }
        saveDiputado('espinosa-mangana', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 68010,
              intervenciones: 140,
              palabras: 54431,
              "p_infraestructuras":20,
              "p_terrorismo":370,
              "p_justicia":30,
              "p_medioambiente":6,
              "p_empleo":3608,
              "p_economía":8601,
              "p_pensiones":87,
              "p_educacion":40,
              "p_salud y sanidad":12,
              "p_guerra":17,
              "p_jueventud":8,
              "p_inmigracion":72,
              "p_inseguridad":8,
        }
        saveDiputado('duran-i-lleida', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 68426,
              intervenciones: 167,
              palabras: 56744,
              "p_terrorismo":715,
              "p_inmigracion":3540,
              "p_educacion":20,
              "p_medioambiente":30,
              "p_empleo":3116,
              "p_infraestructuras":22,
              "p_economía":3149,
              "p_clase politica":182,
              "p_salud y sanidad":18,
              "p_justicia":31,
              "p_racismo":6,
              "p_jueventud":2,
              "p_vivienda":10,
              "p_pensiones":6,
        }
        saveDiputado('hernando-fraile', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 68908,
              intervenciones: 111,
              palabras: 63348,
              "p_terrorismo":470,
              "p_educacion":25,
              "p_economía":4324,
              "p_justicia":16,
              "p_medioambiente":9,
              "p_salud y sanidad":57,
              "p_infraestructuras":3,
              "p_pensiones":6,
              "p_empleo":82,
              "p_vivienda":5,
              "p_inseguridad":8,
        }
        saveDiputado('alonso-nuñez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 71002,
              intervenciones: 142,
              palabras: 59555,
              "p_terrorismo":320,
              "p_economía":6627,
              "p_empleo":3444,
              "p_infraestructuras":26,
              "p_salud y sanidad":36,
              "p_inmigracion":168,
              "p_medioambiente":7,
              "p_pensiones":21,
              "p_justicia":1,
              "p_educacion":85,
              "p_jueventud":2,
        }
        saveDiputado('membrado-giner', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 71095,
              intervenciones: 140,
              palabras: 58285,
              "p_terrorismo":350,
              "p_infraestructuras":34,
              "p_economía":8742,
              "p_pensiones":90,
              "p_clase politica":754,
              "p_justicia":105,
              "p_inmigracion":108,
              "p_educacion":55,
              "p_medioambiente":77,
              "p_empleo":1640,
              "p_vivienda":60,
              "p_salud y sanidad":51,
              "p_guerra":4,
              "p_inseguridad":40,
        }
        saveDiputado('buenaventura-puig', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 73046,
              intervenciones: 180,
              palabras: 54612,
              "p_terrorismo":590,
              "p_economía":13771,
              "p_empleo":3034,
              "p_justicia":25,
              "p_salud y sanidad":33,
              "p_medioambiente":6,
              "p_vivienda":15,
              "p_educacion":20,
              "p_infraestructuras":4,
              "p_pensiones":30,
              "p_jueventud":6,
        }
        saveDiputado('merino-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 74018,
              intervenciones: 66,
              palabras: 58678,
              "p_infraestructuras":12,
              "p_terrorismo":390,
              "p_economía":10293,
              "p_justicia":121,
              "p_empleo":3116,
              "p_salud y sanidad":6,
              "p_vivienda":20,
              "p_pensiones":81,
              "p_medioambiente":7,
              "p_clase politica":936,
              "p_educacion":20,
              "p_inseguridad":8,
        }
        saveDiputado('madrazo-diaz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 76597,
              intervenciones: 101,
              palabras: 69217,
              "p_terrorismo":545,
              "p_salud y sanidad":42,
              "p_medioambiente":6,
              "p_economía":5781,
              "p_empleo":410,
              "p_educacion":60,
              "p_inmigracion":24,
              "p_justicia":4,
              "p_guerra":2,
              "p_infraestructuras":1,
        }
        saveDiputado('rodriguez-ramos', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 77514,
              intervenciones: 110,
              palabras: 67379,
              "p_empleo":1476,
              "p_terrorismo":610,
              "p_economía":7379,
              "p_infraestructuras":11,
              "p_justicia":12,
              "p_clase politica":52,
              "p_medioambiente":22,
              "p_educacion":20,
              "p_salud y sanidad":3,
        }
        saveDiputado('erias-rey', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 79003,
              intervenciones: 74,
              palabras: 71181,
              "p_terrorismo":360,
              "p_economía":5452,
              "p_justicia":49,
              "p_vivienda":930,
              "p_empleo":574,
              "p_educacion":40,
              "p_infraestructuras":7,
              "p_salud y sanidad":12,
              "p_jueventud":6,
              "p_medioambiente":7,
              "p_pensiones":15,
        }
        saveDiputado('corredor-sierra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 80268,
              intervenciones: 37,
              palabras: 59375,
              "p_terrorismo":335,
              "p_infraestructuras":6,
              "p_salud y sanidad":24,
              "p_economía":18001,
              "p_justicia":115,
              "p_empleo":1558,
              "p_pensiones":27,
              "p_vivienda":25,
              "p_clase politica":598,
              "p_educacion":10,
              "p_medioambiente":3,
              "p_jueventud":2,
              "p_guerra":4,
        }
        saveDiputado('ocaña-perez-de-tudela', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 80841,
              intervenciones: 182,
              palabras: 77286,
              "p_terrorismo":410,
              "p_infraestructuras":12,
              "p_salud y sanidad":168,
              "p_justicia":18,
              "p_economía":1457,
              "p_clase politica":156,
              "p_medioambiente":97,
              "p_educacion":50,
              "p_inseguridad":24,
              "p_jueventud":2,
              "p_empleo":246,
              "p_vivienda":5,
        }
        saveDiputado('agirretxea-urresti', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 82504,
              intervenciones: 177,
              palabras: 69789,
              "p_economía":8742,
              "p_terrorismo":655,
              "p_vivienda":1055,
              "p_educacion":65,
              "p_salud y sanidad":9,
              "p_infraestructuras":14,
              "p_justicia":25,
              "p_medioambiente":8,
              "p_empleo":1230,
              "p_jueventud":6,
              "p_pensiones":21,
        }
        saveDiputado('matos-mascareño', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 83230,
              intervenciones: 276,
              palabras: 60890,
              "p_terrorismo":310,
              "p_empleo":8774,
              "p_economía":11609,
              "p_justicia":29,
              "p_medioambiente":7,
              "p_infraestructuras":7,
              "p_clase politica":26,
              "p_pensiones":156,
              "p_salud y sanidad":12,
              "p_guerra":22,
              "p_inseguridad":8,
        }
        saveDiputado('rajoy-brey', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 83888,
              intervenciones: 174,
              palabras: 75187,
              "p_terrorismo":860,
              "p_infraestructuras":42,
              "p_economía":5170,
              "p_justicia":27,
              "p_medioambiente":6,
              "p_empleo":1394,
              "p_jueventud":2,
              "p_inseguridad":96,
              "p_educacion":45,
              "p_salud y sanidad":21,
              "p_pensiones":69,
              "p_vivienda":20,
              "p_clase politica":78,
              "p_nacionalismos":1,
        }
        saveDiputado('barrachina-ros', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 83889,
              intervenciones: 132,
              palabras: 63993,
              "p_terrorismo":305,
              "p_economía":18471,
              "p_justicia":66,
              "p_empleo":328,
              "p_educacion":45,
              "p_vivienda":5,
              "p_medioambiente":5,
              "p_infraestructuras":5,
              "p_salud y sanidad":3,
              "p_pensiones":3,
        }
        saveDiputado('fernandez-marugan', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 86442,
              intervenciones: 325,
              palabras: 79822,
              "p_terrorismo":565,
              "p_infraestructuras":28,
              "p_inseguridad":224,
              "p_justicia":144,
              "p_pensiones":33,
              "p_inmigracion":168,
              "p_salud y sanidad":24,
              "p_economía":3243,
              "p_educacion":40,
              "p_drogas":5,
              "p_medioambiente":7,
              "p_clase politica":260,
              "p_vivienda":5,
              "p_guerra":1,
              "p_jueventud":2,
              "p_empleo":246,
        }
        saveDiputado('perez-rubalcaba', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 86539,
              intervenciones: 130,
              palabras: 65687,
              "p_terrorismo":440,
              "p_economía":18236,
              "p_educacion":40,
              "p_justicia":32,
              "p_empleo":1312,
              "p_medioambiente":7,
              "p_infraestructuras":15,
              "p_pensiones":36,
              "p_salud y sanidad":12,
              "p_vivienda":20,
              "p_clase politica":52,
        }
        saveDiputado('nadal-belda', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 94213,
              intervenciones: 100,
              palabras: 80499,
              "p_terrorismo":375,
              "p_salud y sanidad":39,
              "p_economía":10199,
              "p_pensiones":1146,
              "p_educacion":50,
              "p_empleo":1230,
              "p_infraestructuras":34,
              "p_justicia":18,
              "p_inmigracion":72,
              "p_medioambiente":5,
              "p_vivienda":10,
              "p_jueventud":2,
              "p_inseguridad":8,
              "p_clase politica":26,
        }
        saveDiputado('burgos-gallego', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 95914,
              intervenciones: 257,
              palabras: 87325,
              "p_terrorismo":440,
              "p_infraestructuras":287,
              "p_salud y sanidad":21,
              "p_economía":6298,
              "p_medioambiente":20,
              "p_educacion":15,
              "p_justicia":9,
              "p_guerra":2,
              "p_vivienda":25,
              "p_inseguridad":8,
              "p_pensiones":15,
              "p_empleo":164,
        }
        saveDiputado('blanco-lopez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 98071,
              intervenciones: 140,
              palabras: 76242,
              "p_terrorismo":415,
              "p_economía":19223,
              "p_justicia":92,
              "p_educacion":50,
              "p_infraestructuras":28,
              "p_salud y sanidad":18,
              "p_vivienda":20,
              "p_inmigracion":12,
              "p_empleo":984,
              "p_inseguridad":8,
              "p_medioambiente":7,
              "p_clase politica":260,
              "p_pensiones":12,
        }
        saveDiputado('solbes-mira', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 99375,
              intervenciones: 114,
              palabras: 82913,
              "p_justicia":39,
              "p_terrorismo":855,
              "p_economía":14053,
              "p_educacion":630,
              "p_vivienda":10,
              "p_salud y sanidad":24,
              "p_empleo":164,
              "p_infraestructuras":3,
              "p_medioambiente":4,
              "p_pensiones":6,
              "p_clase politica":104,
        }
        saveDiputado('elorriaga-pisarik', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 100263,
              intervenciones: 207,
              palabras: 88864,
              "p_terrorismo":545,
              "p_educacion":195,
              "p_guerra":14,
              "p_justicia":34,
              "p_empleo":1476,
              "p_economía":7802,
              "p_nacionalismos":2,
              "p_clase politica":130,
              "p_vivienda":45,
              "p_jueventud":2,
              "p_infraestructuras":14,
              "p_salud y sanidad":81,
              "p_medioambiente":3,
              "p_pensiones":21,
        }
        saveDiputado('salvador-armendariz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 101928,
              intervenciones: 231,
              palabras: 89502,
              "p_economía":9588,
              "p_terrorismo":780,
              "p_infraestructuras":205,
              "p_medioambiente":10,
              "p_clase politica":78,
              "p_empleo":574,
              "p_educacion":15,
              "p_justicia":11,
              "p_salud y sanidad":9,
              "p_guerra":1,
        }
        saveDiputado('ayala-sanchez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 103277,
              intervenciones: 113,
              palabras: 94984,
              "p_terrorismo":650,
              "p_economía":5781,
              "p_inmigracion":60,
              "p_salud y sanidad":912,
              "p_justicia":17,
              "p_medioambiente":8,
              "p_guerra":12,
              "p_infraestructuras":55,
              "p_jueventud":6,
              "p_educacion":110,
              "p_empleo":82,
              "p_pensiones":27,
              "p_inseguridad":8,
        }
        saveDiputado('jimenez-garcia-herrera', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 106464,
              intervenciones: 275,
              palabras: 100608,
              "p_vivienda":15,
              "p_economía":2444,
              "p_medioambiente":9,
              "p_racismo":1,
              "p_terrorismo":785,
              "p_salud y sanidad":27,
              "p_infraestructuras":31,
              "p_inmigracion":144,
              "p_educacion":625,
              "p_justicia":34,
              "p_inseguridad":56,
              "p_empleo":246,
              "p_pensiones":9,
              "p_nacionalismos":3,
              "p_clase politica":52,
        }
        saveDiputado('esteban-bravo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 106881,
              intervenciones: 261,
              palabras: 86982,
              "p_pensiones":393,
              "p_inmigracion":432,
              "p_educacion":25,
              "p_terrorismo":255,
              "p_empleo":6150,
              "p_economía":11233,
              "p_justicia":11,
              "p_infraestructuras":10,
              "p_salud y sanidad":78,
              "p_medioambiente":5,
              "p_jueventud":2,
        }
        saveDiputado('corbacho-chaves', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 107531,
              intervenciones: 133,
              palabras: 100227,
              "p_terrorismo":1030,
              "p_salud y sanidad":27,
              "p_economía":5264,
              "p_guerra":104,
              "p_educacion":50,
              "p_medioambiente":5,
              "p_vivienda":5,
              "p_infraestructuras":10,
              "p_justicia":17,
              "p_jueventud":2,
              "p_inseguridad":16,
              "p_empleo":82,
              "p_inmigracion":24,
              "p_pensiones":3,
        }
        saveDiputado('moratinos-cuyaube', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 109230,
              intervenciones: 234,
              palabras: 103338,
              "p_infraestructuras":75,
              "p_salud y sanidad":561,
              "p_economía":3102,
              "p_terrorismo":575,
              "p_inseguridad":16,
              "p_justicia":18,
              "p_educacion":180,
              "p_medioambiente":33,
              "p_jueventud":2,
              "p_empleo":82,
              "p_clase politica":78,
        }
        saveDiputado('tarruella-tomas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 111271,
              intervenciones: 276,
              palabras: 99211,
              "p_terrorismo":410,
              "p_infraestructuras":12,
              "p_economía":9118,
              "p_salud y sanidad":18,
              "p_justicia":14,
              "p_empleo":902,
              "p_educacion":55,
              "p_pensiones":12,
              "p_inseguridad":8,
              "p_medioambiente":43,
              "p_jueventud":4,
              "p_vivienda":5,
              "p_clase politica":78,
              "p_guerra":1,
        }
        saveDiputado('sebastian-gascon', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 113221,
              intervenciones: 187,
              palabras: 102307,
              "p_terrorismo":1250,
              "p_medioambiente":4,
              "p_economía":8460,
              "p_infraestructuras":5,
              "p_justicia":34,
              "p_inmigracion":48,
              "p_salud y sanidad":99,
              "p_drogas":1,
              "p_educacion":70,
              "p_pensiones":3,
              "p_vivienda":5,
        }
        saveDiputado('robles-orozco', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 115773,
              intervenciones: 263,
              palabras: 101778,
              "p_terrorismo":710,
              "p_economía":9776,
              "p_salud y sanidad":198,
              "p_infraestructuras":24,
              "p_empleo":1640,
              "p_justicia":36,
              "p_educacion":85,
              "p_inmigracion":96,
              "p_pensiones":72,
              "p_jueventud":10,
              "p_guerra":7,
              "p_vivienda":10,
              "p_inseguridad":16,
        }
        saveDiputado('barkos-berruezo', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 119287,
              intervenciones: 242,
              palabras: 105324,
              "p_terrorismo":875,
              "p_infraestructuras":57,
              "p_salud y sanidad":63,
              "p_justicia":33,
              "p_economía":10246,
              "p_educacion":395,
              "p_vivienda":25,
              "p_empleo":902,
              "p_medioambiente":28,
              "p_clase politica":78,
              "p_inmigracion":48,
              "p_pensiones":3,
        }
        saveDiputado('canet-i-coma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 125388,
              intervenciones: 226,
              palabras: 104826,
              "p_infraestructuras":52,
              "p_inmigracion":660,
              "p_terrorismo":365,
              "p_educacion":100,
              "p_empleo":7134,
              "p_salud y sanidad":51,
              "p_economía":10716,
              "p_medioambiente":9,
              "p_justicia":72,
              "p_pensiones":30,
              "p_vivienda":20,
              "p_jueventud":8,
              "p_clase politica":208,
              "p_racismo":4,
              "p_guerra":2,
              "p_nacionalismos":1,
        }
        saveDiputado('oramas-gonzalez-moro', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 130202,
              intervenciones: 190,
              palabras: 124041,
              "p_terrorismo":800,
              "p_justicia":69,
              "p_educacion":870,
              "p_economía":2350,
              "p_medioambiente":6,
              "p_inseguridad":96,
              "p_inmigracion":144,
              "p_empleo":738,
              "p_pensiones":15,
              "p_salud y sanidad":51,
              "p_infraestructuras":29,
              "p_jueventud":6,
              "p_racismo":1,
              "p_vivienda":5,
              "p_violencia machista":4,
              "p_guerra":1,
              "p_clase politica":26,
        }
        saveDiputado('pigem-i-palmes', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 136829,
              intervenciones: 147,
              palabras: 98566,
              "p_empleo":22632,
              "p_economía":13348,
              "p_infraestructuras":77,
              "p_terrorismo":620,
              "p_pensiones":183,
              "p_educacion":85,
              "p_justicia":21,
              "p_salud y sanidad":33,
              "p_inmigracion":456,
              "p_medioambiente":21,
              "p_jueventud":10,
              "p_clase politica":26,
              "p_vivienda":15,
              "p_racismo":1,
        }
        saveDiputado('echaniz-salgado', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 138853,
              intervenciones: 286,
              palabras: 128543,
              "p_terrorismo":1420,
              "p_justicia":69,
              "p_inseguridad":488,
              "p_infraestructuras":38,
              "p_economía":4841,
              "p_educacion":85,
              "p_medioambiente":16,
              "p_empleo":984,
              "p_pensiones":42,
              "p_inmigracion":864,
              "p_salud y sanidad":15,
              "p_guerra":7,
              "p_drogas":2,
              "p_jueventud":4,
              "p_vivienda":5,
        }
        saveDiputado('cosido-gutierrez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 142484,
              intervenciones: 291,
              palabras: 129696,
              "p_terrorismo":690,
              "p_vivienda":45,
              "p_educacion":185,
              "p_salud y sanidad":171,
              "p_infraestructuras":188,
              "p_justicia":50,
              "p_economía":7379,
              "p_inmigracion":192,
              "p_inseguridad":32,
              "p_medioambiente":13,
              "p_empleo":2214,
              "p_clase politica":156,
              "p_nacionalismos":2,
              "p_pensiones":12,
              "p_guerra":4,
        }
        saveDiputado('perestelo-rodriguez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 148308,
              intervenciones: 208,
              palabras: 127170,
              "p_terrorismo":1120,
              "p_economía":16168,
              "p_justicia":119,
              "p_educacion":1240,
              "p_infraestructuras":25,
              "p_vivienda":10,
              "p_medioambiente":4,
              "p_empleo":1148,
              "p_guerra":8,
              "p_salud y sanidad":9,
              "p_clase politica":234,
              "p_pensiones":12,
              "p_nacionalismos":1,
        }
        saveDiputado('riera-i-reñe', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 148418,
              intervenciones: 214,
              palabras: 90134,
              "p_empleo":15990,
              "p_economía":40420,
              "p_justicia":47,
              "p_inmigracion":72,
              "p_terrorismo":360,
              "p_educacion":75,
              "p_medioambiente":17,
              "p_salud y sanidad":15,
              "p_infraestructuras":16,
              "p_pensiones":60,
              "p_vivienda":10,
              "p_clase politica":130,
              "p_jueventud":2,
        }
        saveDiputado('montoro-romero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 148515,
              intervenciones: 297,
              palabras: 137748,
              "p_terrorismo":995,
              "p_salud y sanidad":42,
              "p_justicia":215,
              "p_infraestructuras":88,
              "p_educacion":60,
              "p_economía":7520,
              "p_medioambiente":59,
              "p_vivienda":10,
              "p_clase politica":26,
              "p_inseguridad":88,
              "p_pensiones":12,
              "p_empleo":164,
              "p_guerra":1,
              "p_jueventud":2,
        }
        saveDiputado('jane-i-guasch', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 154749,
              intervenciones: 309,
              palabras: 145989,
              "p_terrorismo":1050,
              "p_vivienda":55,
              "p_justicia":20,
              "p_jueventud":4,
              "p_infraestructuras":149,
              "p_economía":5358,
              "p_salud y sanidad":33,
              "p_inseguridad":48,
              "p_educacion":95,
              "p_medioambiente":32,
              "p_empleo":328,
              "p_guerra":43,
        }
        saveDiputado('beloki-guerra', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 188633,
              intervenciones: 293,
              palabras: 145219,
              "p_justicia":128,
              "p_terrorismo":830,
              "p_infraestructuras":19,
              "p_economía":35156,
              "p_educacion":75,
              "p_medioambiente":17,
              "p_salud y sanidad":18,
              "p_empleo":5084,
              "p_pensiones":81,
              "p_vivienda":40,
              "p_guerra":2,
              "p_inseguridad":32,
              "p_clase politica":442,
              "p_inmigracion":24,
              "p_nacionalismos":1,
        }
        saveDiputado('azpiazu-uriarte', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 191859,
              intervenciones: 435,
              palabras: 146917,
              "p_infraestructuras":43,
              "p_salud y sanidad":24,
              "p_terrorismo":830,
              "p_economía":39433,
              "p_empleo":1476,
              "p_justicia":194,
              "p_clase politica":494,
              "p_pensiones":186,
              "p_educacion":50,
              "p_medioambiente":4,
              "p_vivienda":25,
              "p_inseguridad":8,
        }
        saveDiputado('salgado-mendez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 193624,
              intervenciones: 345,
              palabras: 184657,
              "p_terrorismo":1880,
              "p_economía":3666,
              "p_salud y sanidad":141,
              "p_guerra":134,
              "p_educacion":280,
              "p_pensiones":9,
              "p_empleo":574,
              "p_infraestructuras":37,
              "p_justicia":52,
              "p_inseguridad":96,
              "p_medioambiente":18,
              "p_vivienda":35,
              "p_nacionalismos":10,
              "p_jueventud":2,
              "p_clase politica":260,
              "p_inmigracion":48,
        }
        saveDiputado('xucla-i-costa', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 204935,
              intervenciones: 547,
              palabras: 167899,
              "p_inseguridad":48,
              "p_terrorismo":920,
              "p_justicia":160,
              "p_infraestructuras":46,
              "p_medioambiente":17,
              "p_pensiones":339,
              "p_educacion":145,
              "p_economía":26978,
              "p_empleo":5084,
              "p_vivienda":50,
              "p_clase politica":338,
              "p_salud y sanidad":78,
              "p_inmigracion":24,
              "p_guerra":74,
        }
        saveDiputado('rodriguez-zapatero', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 224554,
              intervenciones: 6506,
              palabras: 188423,
              "p_terrorismo":245,
              "p_medioambiente":14,
              "p_economía":2068,
              "p_salud y sanidad":228,
              "p_empleo":738,
              "p_justicia":22,
              "p_clase politica":26,
              "p_educacion":90,
              "p_infraestructuras":9,
              "p_vivienda":5,
              "p_inmigracion":144,
              "p_pensiones":12,
        }
        saveDiputado('cunillera-i-mestres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 243833,
              intervenciones: 485,
              palabras: 224366,
              "p_terrorismo":1205,
              "p_economía":12831,
              "p_infraestructuras":291,
              "p_salud y sanidad":135,
              "p_medioambiente":9,
              "p_justicia":62,
              "p_vivienda":565,
              "p_jueventud":2,
              "p_empleo":1722,
              "p_educacion":120,
              "p_inmigracion":24,
              "p_nacionalismos":1,
              "p_pensiones":12,
              "p_clase politica":52,
              "p_guerra":3,
              "p_inseguridad":8,
        }
        saveDiputado('macias-i-arau', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 271557,
              intervenciones: 5031,
              palabras: 238683,
              "p_terrorismo":4405,
              "p_medioambiente":147,
              "p_justicia":11,
              "p_economía":2397,
              "p_infraestructuras":19,
              "p_salud y sanidad":24,
              "p_educacion":515,
              "p_inmigracion":72,
              "p_inseguridad":40,
              "p_jueventud":2,
              "p_empleo":82,
              "p_guerra":5,
        }
        saveDiputado('presidenta', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 272467,
              intervenciones: 528,
              palabras: 232189,
              "p_economía":30973,
              "p_terrorismo":1785,
              "p_infraestructuras":164,
              "p_clase politica":858,
              "p_educacion":165,
              "p_medioambiente":137,
              "p_justicia":418,
              "p_salud y sanidad":75,
              "p_empleo":2378,
              "p_pensiones":138,
              "p_vivienda":365,
              "p_inseguridad":8,
              "p_guerra":21,
              "p_inmigracion":144,
              "p_violencia machista":2,
              "p_jueventud":6,
              "p_nacionalismos":1,
        }
        saveDiputado('herrera-torres', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 283384,
              intervenciones: 558,
              palabras: 259714,
              "p_terrorismo":1085,
              "p_economía":14241,
              "p_justicia":129,
              "p_inmigracion":768,
              "p_violencia machista":17,
              "p_educacion":590,
              "p_salud y sanidad":132,
              "p_inseguridad":160,
              "p_nacionalismos":14,
              "p_jueventud":34,
              "p_medioambiente":29,
              "p_infraestructuras":127,
              "p_pensiones":165,
              "p_vivienda":10,
              "p_guerra":20,
              "p_empleo":3034,
              "p_racismo":13,
              "p_clase politica":312,
        }
        saveDiputado('tarda-i-coma', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 287161,
              intervenciones: 606,
              palabras: 260076,
              "p_salud y sanidad":165,
              "p_terrorismo":2355,
              "p_infraestructuras":43,
              "p_justicia":252,
              "p_educacion":415,
              "p_guerra":33,
              "p_economía":16638,
              "p_clase politica":806,
              "p_pensiones":126,
              "p_inseguridad":96,
              "p_jueventud":18,
              "p_medioambiente":31,
              "p_racismo":1,
              "p_inmigracion":336,
              "p_empleo":2706,
              "p_vivienda":30,
              "p_drogas":2,
              "p_nacionalismos":2,
        }
        saveDiputado('diez-gonzalez', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 296007,
              intervenciones: 460,
              palabras: 264839,
              "p_empleo":2378,
              "p_terrorismo":1665,
              "p_infraestructuras":75,
              "p_salud y sanidad":186,
              "p_justicia":67,
              "p_inmigracion":636,
              "p_economía":22842,
              "p_pensiones":699,
              "p_educacion":150,
              "p_clase politica":78,
              "p_medioambiente":47,
              "p_guerra":1,
              "p_inseguridad":32,
              "p_vivienda":10,
              "p_jueventud":2,
        }
        saveDiputado('campuzano-i-canades', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 305122,
              intervenciones: 490,
              palabras: 278994,
              "p_terrorismo":1855,
              "p_economía":15557,
              "p_guerra":68,
              "p_racismo":1,
              "p_medioambiente":184,
              "p_educacion":725,
              "p_justicia":124,
              "p_salud y sanidad":264,
              "p_infraestructuras":103,
              "p_pensiones":360,
              "p_inseguridad":120,
              "p_empleo":3608,
              "p_jueventud":10,
              "p_inmigracion":264,
              "p_clase politica":364,
              "p_vivienda":65,
              "p_nacionalismos":3,
              "p_violencia machista":2,
              "p_drogas":1,
        }
        saveDiputado('fernandez-davila', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 313499,
              intervenciones: 538,
              palabras: 262909,
              "p_terrorismo":1465,
              "p_economía":41971,
              "p_infraestructuras":520,
              "p_empleo":2050,
              "p_inmigracion":144,
              "p_salud y sanidad":96,
              "p_justicia":253,
              "p_educacion":530,
              "p_medioambiente":27,
              "p_inseguridad":56,
              "p_clase politica":624,
              "p_guerra":45,
              "p_pensiones":84,
              "p_vivienda":30,
              "p_nacionalismos":4,
              "p_racismo":1,
        }
        saveDiputado('jorquera-caselas', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 362280,
              intervenciones: 745,
              palabras: 342962,
              "p_terrorismo":2240,
              "p_justicia":367,
              "p_economía":9259,
              "p_medioambiente":40,
              "p_clase politica":442,
              "p_infraestructuras":103,
              "p_educacion":670,
              "p_salud y sanidad":129,
              "p_inmigracion":276,
              "p_empleo":1394,
              "p_inseguridad":144,
              "p_vivienda":70,
              "p_pensiones":438,
              "p_guerra":1,
              "p_racismo":4,
              "p_jueventud":16,
        }
        saveDiputado('olabarria-muñoz', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 375368,
              intervenciones: 509,
              palabras: 314395,
              "p_terrorismo":2220,
              "p_salud y sanidad":174,
              "p_economía":46859,
              "p_empleo":5904,
              "p_justicia":404,
              "p_vivienda":240,
              "p_clase politica":1352,
              "p_infraestructuras":229,
              "p_pensiones":222,
              "p_medioambiente":60,
              "p_racismo":9,
              "p_educacion":195,
              "p_inseguridad":104,
              "p_nacionalismos":1,
              "p_guerra":39,
              "p_inmigracion":408,
              "p_violencia machista":2,
              "p_jueventud":6,
        }
        saveDiputado('ridao-i-martin', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 396059,
              intervenciones: 468,
              palabras: 337753,
              "p_terrorismo":1805,
              "p_infraestructuras":153,
              "p_salud y sanidad":159,
              "p_economía":41454,
              "p_justicia":389,
              "p_empleo":10250,
              "p_pensiones":189,
              "p_medioambiente":36,
              "p_vivienda":75,
              "p_educacion":725,
              "p_clase politica":468,
              "p_inmigracion":252,
              "p_racismo":3,
              "p_inseguridad":8,
        }
        saveDiputado('sanchez-i-llibre', info, callback) },

    function(callback) {
	    var info = {
              puntuacion: 445615,
              intervenciones: 744,
              palabras: 372846,
              "p_salud y sanidad":1296,
              "p_educacion":670,
              "p_infraestructuras":126,
              "p_economía":58985,
              "p_guerra":170,
              "p_racismo":8,
              "p_pensiones":873,
              "p_terrorismo":1655,
              "p_inmigracion":1236,
              "p_justicia":285,
              "p_empleo":2296,
              "p_medioambiente":71,
              "p_vivienda":60,
              "p_clase politica":1170,
              "p_jueventud":12,
              "p_inseguridad":136,
        }
        saveDiputado('llamazares-trigo', info, callback) },


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
