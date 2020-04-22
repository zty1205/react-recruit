import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, receiveMsg, sendMsg, readMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim';

const EMOJI = '😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍 😀 😃 🤣 😍'.split(' ').filter(x => x).map(v => ({text: v}))

@connect(
  state => state,
  { getMsgList, sendMsg, receiveMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
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
    this.setState({
      text: ''
    })
  }
  componentDidMount() {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  componentWillUnmount() { // 相当于路由离开了 且没有keep-alive
    const to = this.props.match.params.user // 更新已读
    this.props.readMsg(to)
  }
	render() {
    const userId = this.props.match.params.user // id
    const Item = List.Item
    const userMap = this.props.chat.users
    if (!userMap[userId]) {
      return null
    }
    const chatId = [userId, this.props.user._id].sort().join('-')
    const chatMsg = this.props.chat.chatMsg.filter(x => x.chatId === chatId)
		return (
			<div id={'chat-page'}>
        <NavBar mode="dark" icon={<Icon type="left"></Icon>}
         onLeftClick={()=> this.props.history.goBack()}>
          {userMap[userId].name}
        </NavBar>
        <QueueAnim delay={80}>
          {chatMsg.map(v => {
            const avatar = require(`../../component/img/${userMap[v.from].avatar}.png`)
            return v.from === userId ? (
              <List key={v._id} className="chat-me">
                <Item extra={<img src={avatar} alt="头像"></img>}>收到的：{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item thumb={avatar}>我发出的：{v.content}</Item>
              </List>
            )
          })}
        </QueueAnim>
        <div className="sticker-footer">
          <List>
            <InputItem placeholder="请输入" value={this.state.text}
             onChange={v=>this.setState({'text': v})}
            extra={
              <div>
                <span role="img" style={{marginLeft: 15}} onClick={() => {
                  this.setState(prestate => {
                    return {
                      showEmoji: !prestate.showEmoji
                    }
                  })
                }}><span role="img" aria-label="表情">😃</span></span>
                <span onClick={() => this.handleSend()}>发送</span>
              </div>
            }></InputItem>
          </List>
          {
            this.state.showEmoji ? 
            <Grid data={EMOJI} columnNum={9} carouselMaxRow={4} isCarousel={true}
              onClick={(el) => {
                this.setState(prestate => {
                  return {
                    text: prestate.text + el.text
                  }
                })
              }}
            ></Grid>
            : null
          }
        </div>
			</div>
		)
	}
}

export default Chat
