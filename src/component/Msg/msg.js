import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
	state => state,
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
	render() {
    // 按照chatId分组
    const Item = List.Item
    const Brief = Item.Brief
    const userId = this.props.user._id
    const userMap = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatMsg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a)
      const b_last = this.getLast(b)
      return b_last.createTime - a_last.createTime
    })
		return (
      <div>
        {
          chatList.map(v => {
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userId ? v[0].to : v[0].from
            const unread = v.filter(e => !e.read && e.to === userId).length
            const name = userMap[targetId] && userMap[targetId].name
            const avatar = userMap[targetId] && userMap[targetId].avatar
            return (
              <List key={lastItem._id}>
                <Item extra={<Badge text={unread}></Badge>} 
                  thumb={require(`../img/${avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}>
                  {lastItem.content}
                  <Brief>{name}</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    )
	}
}


export default Msg
