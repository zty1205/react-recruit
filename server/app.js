const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./controller/user')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

import csshook from 'css-modules-require-hook/preset' // 放在前面
import assethook from 'asset-require-hook'
assethook({
  extensions: ['png'],
  limit: 10000
})
import React from 'react'
import {renderToString, renderToNodeStream} from 'react-dom/server' // renderToString 返回html字符串
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router-dom'
import reducers from '../src/reducer'
import App from '../src/app'
import staticPath from '../build/asset-manifest.json'


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
app.use('/', express.static(path.resolve('build')))
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }

  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  const context = {}
  const mainStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App></App>
      </StaticRouter>
    </Provider>
  )

  const entrypoints = staticPath.entrypoints
  const cssPoints = entrypoints.filter(p => /\.css$/.test(p))
  const jsPoints = entrypoints.filter(p => /\.js$/.test(p))

  const cssLink = cssPoints.map(css => `<link rel="stylesheet" type="text/css" href="${css}"></link>`).join('')
  const jsScript = jsPoints.map(js => `<script src="${js}"></script>`).join('')
  console.log('cssLink = ', cssLink)
  console.log('jsScript', jsScript)

  res.write(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app"/>
    <title>React App</title>
    ${cssLink}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">`
  )
  mainStream.pipe(res, {end: false})
  mainStream.on('end', function() {
    res.write(`</div>
      ${jsScript}
    </body>
  </html>`)
  res.end()
  })
  
  // return res.send(htmlRes)
  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/user', userRouter)

server.listen(4000, function() {
  console.log('server listen: http://localhost:4000')
})