const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./controller/user')

const app = express()

app.use(cors({
    origin:['http://localhost:3000'],  //指定接收的地址
    methods:['GET','POST', 'OPTION'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(4000, function() {
  console.log('server listen: http://localhost:4000')
})