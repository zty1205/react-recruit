import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Route } from 'react-router-dom'
import NavLinkBar from '../NavLinkBar/navLinkBar'
import Boss from '../Boss/boss'
import Genius from '../Genius/genius'
import User from '../User/user'
import Msg from '../Msg/msg'
import { getMsgList, receiveMsg, sendMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim';

@connect(
	state => state,
	{ getMsgList, sendMsg, receiveMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
	render() {
		const { pathname } = this.props.location
		const user = this.props.user
		const navList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: user.type === 'genius'
			},
			{
				path: '/genius',
				text: 'boss',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: user.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
			}
		]
		const page = navList.find(v => v.path === pathname)

		return (
			<div>
				<NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
				<div style={{ marginTop: 45 }}>
					<QueueAnim type="scaleX" duration={600}>
					{/* <Switch>
						{navList.map(v => ( */}
							<Route key={page.path} path={page.path} component={page.component}></Route>
						{/* ))}
					</Switch> */}
					</QueueAnim>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>

			</div>
		)


	}

}

export default Dashboard