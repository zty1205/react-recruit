import axios from 'axios'

const AUTH_SUCCESS = 'auth_success' // login and register
const ERRPOR_MSG = 'error_msg'
const LOAD_DATA = 'load_data'

function getRedirectPath({ type, avatar }) {
  console.log('type = ', type)
  console.log('avatar = ', avatar)
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo 
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) {
    url += 'Info'
  }
  return url
}

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}

// reducers
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case ERRPOR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

function authSuccess(obj) {
  // eslint-disable-next-line
  const {pwd, ...data} = obj // 过滤pwd属性
  return { type: AUTH_SUCCESS, payload: data }
}

export function loadData(userInfo) {
  return { type: LOAD_DATA, payload: userInfo }
}

function errorMsg(msg) {
  return { msg, type: ERRPOR_MSG }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        console.log('res = ', res)
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg("请输入用户名和密码")
  }
  if (pwd !== repeatpwd) {
    return errorMsg("密码和确认密码不同")
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}