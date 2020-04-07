var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var child = require('child_process');
var port = 8080;

server.listen(port);

app.get('/', (req, res) => res.sendFile(__dirname + '/custom.html'));

io.on('connection', function (socket) {
  socket.on('gooroom-guide', () => {
    gooroom_guide = child.spawn('/usr/bin/gooroom-guide', [], { detached: true, stdio: 'ignore' });
    gooroom_guide.unref()
    });
  socket.on('launch-ghub', () => {
    child.exec('/bin/systemctl start bh_sd_ghub', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    });
  });
});
