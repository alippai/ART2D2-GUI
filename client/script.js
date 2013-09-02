var connection = new WebSocket("ws://localhost:8080/");
$connect = $('#connect');

connection.onopen = function () {
  $connect.removeAttr('disabled');
  $connect.removeClass('disabled');
};

connection.onmessage = function (message) {
  console.log('message received: ' + message.data);
};

$connect.on('click', function (e) {
  connection.send(JSON.stringify({ type: 'command', data: 'connect'}));
  e.preventDefault();
  return false;
});