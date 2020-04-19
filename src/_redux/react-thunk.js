const thunk = ({dispatch, getState}) => next => action => {
  // next 下一个dispatch
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  // 默认什么都没干
  return next(action)
}

export default thunk

export const arrayThunk = ({dispatch, getState}) => next => action => {
  if (Array.isArray(action)) {
    return action.forEach(v => next(v))
  }

  // 默认什么都没干
  return next(action)
}
