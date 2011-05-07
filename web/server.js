var _redis = require("redis")
var redis = _redis.createClient()
var express = require("express")

redis.on("error", function (err) {
	console.log("Error " + err)
});

var app = express.createServer()

app.get('/', function(req, res){
    res.send('Hello World')
});
var port = parseInt(process.argv[2], 10) || 3000
app.listen(3000)

process.on('SIGINT', function () {
	console.log()
	console.log('Stopping redis client')
	redis.quit()
	console.log('Bood bye')
	process.exit(0)
});