import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './redux'

// 下面的context使用需在react 16.3 以前的版本
// 1. 负责接收一个组件，把state里的一些属性放到组件里
// 2. 数据变化的时候，通知组件
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WarpComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const {store} = this.context
      store.subscribe(() => this.update())
      this.update()
    }
    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      // 直接执行actionCreator是无意义的
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...{num: stateProps},
          ...dispatchProps
        }
      })
    }
    render() {
      return (
        <WarpComponent {...this.state.props}></WarpComponent>
      )
    }
  }
}

// 把store 放到context,所有的子元素都可以获取到store
export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.store}
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}
