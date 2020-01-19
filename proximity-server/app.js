const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http)
const port = 3000

const emitData = {
  color: '#55cf92',
  isServer: true,
  id: Math.floor(Math.random()*(99999-10000+1)+10000),
  valuesP1: [],
  valuesP2: []
}

Socketio.on('connection', socket => {
  console.log(`Client connected [ ${emitData.id} ]`)
  
  socket.on('valuesP1', data => {
    emitData.valuesP1 = data
    Socketio.emit('emitData', emitData)
  })
  socket.on('valuesP2', data => {
    emitData.valuesP2 = data
    Socketio.emit('emitData', emitData)
  })
  socket.emit('emitData', emitData)
})

Http.listen(port, () => {
  console.log(`listening at :${port}...`)
})