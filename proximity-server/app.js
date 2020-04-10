const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http)
import { port } from '../src/global'

const emitData = {
  color: '#55cf92',
  isServer: true,
  id: Math.floor(Math.random()*(99999-10000+1)+10000),
  valuesP1: [],
  valuesP2: [],
  placements: Array.from(Array(120), () => null),
  scoreP1: 0,
  scoreP2: 0,
  spotsP1: 0,
  spotsP2: 0,
  turnValue: 0,
  turnClass: 'p1',
  gameResult: '',
}

Socketio.on('connection', socket => {
  console.log(`Client connected [ ${emitData.id} ]`)
  
  socket.on('valuesP1', x => {
    emitData.valuesP1 = x
    Socketio.emit('emitData', emitData)
  })
  socket.on('valuesP2', x => {
    emitData.valuesP2 = x
    Socketio.emit('emitData', emitData)
  })
  socket.on('placements', x => {
    console.log(x)
    emitData.placements = x
    Socketio.emit('emitData', emitData)
  })

}) // connection

Http.listen(port, () => {
  console.log(`listening at :${port}...`)
})