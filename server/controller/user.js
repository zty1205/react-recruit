const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('../DB/db')
const User = model.getModel('user')
const Chat = model.getModel('chat')

Router.get('/list', function (req, res) {
  // User.remove({}, function() {})
  let { type } = req.query
  User.find({ type }, function (err, doc) {
    return res.json({ code: 0, data: doc })
  })
})

Router.get('/info', function (req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '用户信息查询失败' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
  // 用户有没有cookie
})

const _filter = { pwd: 0, _v: 0 } // 返回数据中的pwd将会被过滤

// 登录
Router.post('/login', function (req, res) {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: utility.md5(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或者密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})

// 注册
Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body
  User.findOne({ user }, function (req, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名出错' })
    }
    // 拿不到保存后的信息
    // User.create({user, type, pwd: utility.md5(pwd)}, function(error, documents) {
    //   if (error) {
    //     return res.json({code: 1, msg: '用户创建失败'})
    //   }
    //   return res.json({code: 0})
    // })
    const userModel = new User({ user, type, pwd: utility.md5(pwd) })
    userModel.save(function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      const { user, type, _id } = d
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { user, type, _id } })
    })
  })
})

// 更新个人信息
Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})

Router.get('/getMsgList', function(req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({ code: 1 })
  }
  // {'$or': [{from: userid, to: userid}]}
  Chat.find({}, function(err, doc) {
    if (!err) {
      return res.json({
        code: 0,
        msgList: doc
      })
    }
  })
})

module.exports = Router
