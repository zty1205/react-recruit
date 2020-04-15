import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:4000')

const MSG_LIST = 'msg-list'
const MSG_RECEIVE = 'msg-receive'
const MSG_READ = 'msg-read'

const initState = {
  chatMsg: [],
  unread: 0 // 未读条数
}

export function chat(state = initState, action) {
  console.log('action = ', action)
  switch(action.type) {
    case MSG_LIST: 
      return {
        ...state, 
        chatMsg: action.playload, 
        unread: action.playload.filter(v => !v.read).length
      }
    case MSG_RECEIVE:
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.playload],
        unread: state.unread + 1
      }
    case MSG_READ:
      return state
    default: 
      return state
  }
}

// actionCreator
function msgList(msgs) {
  return {type: MSG_LIST, playload: msgs}
}
function msgReceive(msg) {
  return {type: MSG_RECEIVE, playload: msg}
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getMsgList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgList))
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
  return dispatch => {
    socket.on('receiveMsg', function(data) {
      console.log('reciveMsg data = ', data)
      dispatch(msgReceive(data))
    })
  }
}