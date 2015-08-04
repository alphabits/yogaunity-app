
/*
var allClients = [];
io.sockets.on('connection', function(socket) {
   allClients.push(socket);
   console.log("Got connection. Say hello to " + socket.id + ". Now " + allClients.length + " webjohns connected");

   socket.on('disconnect', function() {
      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
      console.log('Got disconnect! Now ' + allClients.length + ' webjohns connected');
   });
});
*/

/*
amqp.connect().then(function(connection) {
    connection.createChannel().then(function(ch) {
        when.all([
            ch.assertExchange("YUBackend.E.Fanout.Events", "fanout"),
            ch.assertExchange("YUBackend.E.Fanout.Commands", "fanout"),
            ch.assertQueue("YUBackend.Q.Frontend.Events"),
            ch.bindQueue("YUBackend.Q.Frontend.Events", "YUBackend.E.Fanout.Events"),
            ch.consume("YUBackend.Q.Frontend.Events", function(rabbitMessage) {
                var evt = JSON.parse(rabbitMessage.content.toString());
                console.log("Received event from rabbit", evt);
                io.emit("backend-event", evt);
                ch.ack(rabbitMessage);
            })
        ]).then(function() {
            io.on('connection', function(socket) {
                socket.on("error", function(err) {
                    console.log("Got error in listener", err);
                });
                socket.on('client-command', function(data) {
                    console.log("Trying to publish to rabbit", data, typeof data);
                    ch.publish("YUBackend.E.Fanout.Commands", "", new Buffer(JSON.stringify(data)))
                });
            })
        });
    })
})
*/