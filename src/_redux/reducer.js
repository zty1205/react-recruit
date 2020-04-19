// 操作类型宏定义

const ADD_GUN = 'add_gun'
const REMOVE_GUN = 'del_gun'

// 这就是reducer处理函数，参数是状态和新的action
export function counter(state, action) {
  console.log('action = ', action)
  switch (action.type) {
    case ADD_GUN:
      return state + 1
    case REMOVE_GUN:
      return state - 1
    default:
      return 10
  }
}

// actionCreator
export function addGun(){
  return { type: ADD_GUN }
}
export function removeGun(){
  return { type: REMOVE_GUN }
}

// 异步actionCreator
export function addGunAsync(){
  // thunk插件的作用，这里可以返回函数，
  return dispatch => {
    setTimeout(() => {
      // 异步结束后，手动执行dispatch
      dispatch(addGun());
    }, 2000);
  };
}

// actionCreator 数组类型
export function addTwice() {
  return [ { type: REMOVE_GUN },  { type: REMOVE_GUN }]
}