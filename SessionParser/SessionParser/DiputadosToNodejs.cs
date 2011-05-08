using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Parser
{
    public class DiputadosToNodejs
    {
        public void GenerarFicheroNodejs(string pathRawSesiones, string pathFichero)
        {
            SesionParser parser = new SesionParser();
            SesionCollection sesiones = new SesionCollection();
            FileInfo[] infoFicheros = new DirectoryInfo(pathRawSesiones).GetFiles();
            foreach (FileInfo ficheroSesion in infoFicheros)
            {
                Console.WriteLine("Procesando " + ficheroSesion.FullName + "...");
                sesiones.Add(parser.ParsearSesion(ficheroSesion.FullName));
            }
            Console.WriteLine("FIN DEL PROCESADO!!");

            IList<Diputado> diputados =
                sesiones.GetDatosPorDiputados().OrderBy(x => x.Puntuacion).ToList();

            StringBuilder diputadosToNode = new StringBuilder();
            foreach (Diputado diputado in diputados)
            {
                diputadosToNode.Append(DiputadoToNode(diputado));
            }

            File.WriteAllText(
                pathFichero,
                PLANTILLA_NODEJS.Replace("<diputados>", diputadosToNode.ToString()));
        }

        private string DiputadoToNode(Diputado diputado)
        {
            StringBuilder resultado = new StringBuilder();

            resultado.Append(
                @"
    function(callback) {
	    var info = {
");
            resultado.AppendLine("              puntuacion: " + diputado.Puntuacion + ",");
            resultado.AppendLine("              intervenciones: " + diputado.Intervenciones.Count + ",");
            resultado.AppendLine("              palabras: " + diputado.Intervenciones.TotalPalabras + ",");

            foreach (string termino in diputado.Intervenciones.PesoDeTerminos.Keys)
            {
                resultado.AppendLine("              \"p_" + termino + "\":" + diputado.Intervenciones.PesoDeTerminos[termino] + ",");
            }

            resultado.AppendLine("        }");
            resultado.AppendFormat("        saveDiputado('{0}', info, callback) }},\n", diputado.NombreNormalizado);

            return resultado.ToString();
        }

        private const string PLANTILLA_NODEJS =
            @"
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
			<diputados>

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
";
    }
}
