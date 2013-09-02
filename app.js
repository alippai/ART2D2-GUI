var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , dgram = require('dgram');

var client = dgram.createSocket("udp4");

app.use(express.static(__dirname + '/client'));

var server = http.createServer(app);
server.listen(8080, '0.0.0.0');

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
  var msgConnect  = new Buffer([0]);
  client.send(msgConnect, 0, msgConnect.length, 44400, '10.8.11.91', function(err, bytes) {
    console.log('connect sent');
  });

  ws.on('message', function (message) {
    client.send(new Buffer(message[0]), 0, 1, 44400, '10.8.11.91', function(err, bytes) {
      console.log(bytes);
    });
  });

  client.on("message", function (msg, rinfo) {
    console.log('msg');
    console.log(msg);
    console.log('rinfo');
    console.log(rinfo);
  });
});
