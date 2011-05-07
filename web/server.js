var _redis = require("redis")
var redis = _redis.createClient()
var express = require("express")

redis.on("error", function (err) {
	console.log("Error " + err)
});

var app = express.createServer()
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index.ejs', { title: 'Hello world' })
});
var port = parseInt(process.argv[2], 10) || 3000
app.listen(port)


function $() {
	return Array.prototype.slice.call(arguments).join(':');
}

function join(redis, arr, prefix, callback) {
	if(arr.length == 0) {
		callback([]);
		return;
	}
	var multi = redis.multi();
	for (var i=0; i < arr.length; i++) {
		multi.hgetall($(prefix, arr[i]));
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

