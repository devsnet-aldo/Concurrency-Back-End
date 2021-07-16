const log = console.log
const http = require('http').createServer()
const io = require('socket.io')(http, { cors: {
    origin: "*",
    methods: ["GET", "POST"]
  } })
const port = 3000

http.listen(port, () => log(`server listening on port: ${port}`))

io.on('connection', (socket) => {
    log('connected')    
    socket.on('message', (evt) => {
        log(evt)
        socket.broadcast.emit('message', evt.payload.message)
    })
})
io.on('disconnect', (evt) => {
    log('some people left')
})

io.on('done', (evt) => io.close())
