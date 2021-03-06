const http = require('http')
const express = require('express')


const app = express();

app.use(express.static('public'))
app.set('port', process.env.PORT || 5000)


const server = http.createServer(app)
server.on('listening', () => {
 console.log('Listening on port 3000')
})

/* SOCKETS */

const io = require('socket.io').listen(server)

io.sockets.on('connection', (socket) => {
 console.log('Client connected: ' + socket.id)
 socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))
 socket.on('disconnect', () => console.log('Client has disconnected'))
})

server.listen(process.env.PORT || 5000) // .listen('3000')