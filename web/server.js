var _redis = require("redis")
var redis = _redis.createClient()
var express = require("express")

redis.on("error", function (err) {
	console.log("Error " + err)
});

var app = express.createServer()
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	redis.zrange('diputados', 0, -1, function(err, ids) {
		console.log('hay '+ids.length+' diputados')
		join(ids, 'diputado:', function(diputados) {
			res.render('index.ejs', { title: 'Hello world', diputados:diputados })
		})
	})
});

app.get('/diputados', function(req, res) {
	redis.zrange('diputados', 0, -1, function(err, ids) {
		console.log('hay '+ids.length+' diputados')
		join(ids, 'diputado:', function(diputados) {
			res.render('diputados.ejs', { title: 'Hello world', diputados:diputados })
		})
	})
});

app.get('/fight/:id1/:id2', function(req, res) {
	var multi = redis.multi()
	multi.hgetall('diputado:'+req.params.id1)
	multi.hgetall('diputado:'+req.params.id2)
	multi.exec(function(err, reply) {
		console.log(reply)
		res.header("Content-Type", "application/json;charset=utf8")
		res.send(JSON.stringify(reply));
	})
})

var port = parseInt(process.argv[2], 10) || 3000
app.listen(port)


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

process.on('SIGINT', function () {
	console.log()
	console.log('Stopping redis client')
	redis.quit()
	console.log('Bood bye')
	process.exit(0)
});

