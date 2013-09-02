var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();

app.use(express.static(__dirname + '/client'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
  ws.send('pong');
  ws.on('message', function (data) {
    console.log('received: ' + data);
  });
});
