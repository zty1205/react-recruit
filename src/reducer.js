import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatUser } from './redux/chatUser.redux'

export default combineReducers({ user, chatUser })