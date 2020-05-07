var express = require('express');
var app = express();
var http = require('http');
const deepai = require('deepai');

var port = 8081;

console.log('start frontend httpServer');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/static", express.static('./static/'));

app.get('/getPicId', function(req, res, next)
{
    console.log('get request send');
});

app.get('/home', function(req, res, next)
{
    console.log('Datei liefern');
    res.sendfile('frontend-working.html');
});

console.log('listening');

var httpServer = http.createServer(app);
httpServer.listen(port);

