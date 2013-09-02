var connection = new WebSocket("ws://localhost:8080/");

connection.onopen = function () {
  connection.send('ping');
};

connection.onmessage = function (message) {
  console.log('message received: ' + message.data);
};