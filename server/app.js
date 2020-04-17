const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./controller/user')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./DB/db')
const Chat = model.getModel('chat')

// Chat.remove({}, function() {
//   console.log('11')
// })

// io 是全局 socket是某次连接
io.on('connection', function(socket) {
  console.log('socket connection')

  socket.on('sendMsg', function(data) {
    const { from, to, msg } = data
    const chatId = [from, to].sort().join('-')
    Chat.create({chatId, from, to, content: msg}, function(err, doc) {
      io.emit('receiveMsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cors({
    origin:['http://localhost:3000'],  //指定接收的地址
    methods:['GET','POST', 'OPTION'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(4000, function() {
  console.log('server listen: http://localhost:4000')
})