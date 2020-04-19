import React from 'react'
import {connect} from './react-redux'
import { addGun, removeGun, addGunAsync, addTwice } from './redux'

@connect(
  state => state,
  {addGun, removeGun, addGunAsync, addTwice}
)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'zty'
    }
  }
  render() {
    return (
      <div>
        <h2>现在有机枪{this.props.num}把</h2>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>异步申请</button>
        <button onClick={this.props.addTwice}>申请两批</button>
      </div>
    )
  }
}

export default App