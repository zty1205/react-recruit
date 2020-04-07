import axios from 'axios'

const REGISTER_SUCCESS = 'register_success'
const ERRPOR_MSG = 'error_msg'

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: '',
}

// reduces
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.playlod}
    case ERRPOR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default: 
      return state
  }
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, playlod: data}
}

function errorMsg(msg) {
  return {msg, type: ERRPOR_MSG}
}

export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg("请输入用户名和密码")
  }
  if (pwd !== repeatpwd) {
    return errorMsg("密码和确认密码不同")
  }
  return dispatch => {
  axios.post('/user/register', {user, pwd, type})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}