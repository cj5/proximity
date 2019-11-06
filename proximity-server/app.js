const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http)

let color = '#33AB3D'

Socketio.on('connection', socket => {
  console.log('socket connection')
  socket.emit('color', color)
})

Http.listen(3000, () => {
  console.log('listening at :3000...')
})