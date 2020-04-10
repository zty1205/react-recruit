import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatUser.redux'
import UserCard from '../Usercard/usercard'
@connect(
	state=>state.chatUser,
	{getUserList}
)
class Genius extends React.Component{
	componentDidMount() {
		this.props.getUserList('boss')
	}
	render(){
		return <UserCard userlist={this.props.userlist}></UserCard>
	}

}
export default Genius