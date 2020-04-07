const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./controller/user')

// const DB_URL = "mongodb://localhost:27017"
// mongoose.connect(DB_URL)

const app = express()
app.use('/user', userRouter)

app.listen(4000, function() {
  console.log('server listen: http://localhost:4000')
})