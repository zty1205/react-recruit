import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:4000')

const MSG_LIST = 'msg-list'
const MSG_RECEIVE = 'msg-receive'
const MSG_READ = 'msg-read'

const initState = {
  chatMsg: [],
  users: {}, // 用户匹配
  unread: 0 // 未读条数
}

export function chat(state = initState, action) {
  switch(action.type) {
    case MSG_LIST: 
      return {
        ...state, 
        users: action.playload.users,
        chatMsg: action.playload.msgs, 
        unread: action.playload.msgs.filter(v => !v.read && v.to === action.playload.userId).length
      }
    case MSG_RECEIVE:
      const n = action.playload.to === action.playload.userId ? 1 : 0 
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.playload.msg],
        unread: state.unread + n
      }
    case MSG_READ:
      return state
    default: 
      return state
  }
}

// actionCreator
function msgList(msgs, users, userId) {
  return {type: MSG_LIST, playload: {msgs, users, userId}}
}
function msgReceive(msg, userId) {
  return {type: MSG_RECEIVE, playload: {msg, userId}}
}

export function getMsgList() {
  return (dispatch, getState) => {
    // getState 可获取所有state
    axios.get('/user/getMsgList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id
        dispatch(msgList(res.data.msgList, res.data.users, userId))
      }
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}

export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on('receiveMsg', function(data) {
      const userId = getState().user._id
      dispatch(msgReceive(data, userId))
    })
  }
}