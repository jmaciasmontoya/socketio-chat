const application = require('express')();
const server = require('http').createServer(application)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000


application.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});


server.listen(PORT, () => {
   console.log('Servidor ejecutando en puerto: ' + PORT);
});

io.on('connection', (socket) => {
   socket.on('disconnect', () => {
       console.log('Usuario desconectado - Usuario: ' + socket.username);
   });

   socket.on('new message', (msg) => {
       io.emit('send message', {message: msg, user: socket.username});
   });

   socket.on('new user', (usr) => {
       socket.username = usr;
       console.log('Usuario conectado - Usuario: ' + socket.username);
   });
});

