import React from 'react'
import {List, InputItem, NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, receiveMsg, sendMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, sendMsg, receiveMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  handleSend() {
    // socket.emit('sendMsg', {
    //   text: this.state.text
    // })
    // this.setState({
    //   text: ''
    // })
    const from = this.props.user._id
    const to = this.props.match.params.user // id
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
  }
  componentDidMount() {
    setTimeout(() => {
      console.log('state = ', this.state)
      console.log('props = ', this.props)
    }, 1000)
    this.props.getMsgList()
    this.props.receiveMsg()
  }
	render() {
    const user = this.props.match.params.user // id
    const Item = List.Item
		return (
			<div id={'chat-page'}>
        <NavBar mode="dark">
          {this.props.match.params.user}
        </NavBar>
        {this.props.chat.chatMsg.map(v => {
          return v.from === user ? (
            <List key={v._id} className="chat-me"
              // thumb={}
              >
              <Item>收到的：{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}
             extra={v.avatar}>
              <Item>我发出的：{v.content}</Item>
            </List>
          )
        })}
        <div className="sticker-footer">
          <List>
            <InputItem placeholder="请输入" value={this.state.text}
             onChange={v=>this.setState({'text': v})}
            extra={<span onClick={() => this.handleSend()}>发送</span>}></InputItem>
          </List>
        </div>
			</div>
		)
	}
}

export default Chat
