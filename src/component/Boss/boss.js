import React from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatUser.redux";
import UserCard from "../Usercard/usercard";

@connect(
	state => state.chatUser, 
	{ getUserList }
)
class Boss extends React.Component {
	componentDidMount() {
		this.props.getUserList("genius");
	}
	render() {
		return (
			this.props.userlist ? <UserCard userlist={this.props.userlist}></UserCard> : null
		) 
	}
}
export default Boss;
