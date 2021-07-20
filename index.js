const log = console.log
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { cors: {
    origin: "*",
    methods: ["GET", "POST"]
  } })
const port = 3000

function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
    var origin = req.headers.origin;
    if (_.contains(app.get('allowed_origins'), origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    if (req.method === 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  }
  

app.use(allowCrossDomain);

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
