const app = require('express')()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './template/index.html'))
})

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
  socket.on('clip_update', (clip) => {
    console.log('Clip receive', (new Date().toString()))
    io.emit('clip_update', clip)
  })
})

http.listen(3000, () => {
  console.log('Clipocket up')
})