import React from 'react'
// import logoImg from './job.png'
import './logo.css'

// const logoImg = require('./job.png')
class Logo extends React.Component{

	render(){
		return (
			<div className="logo-container">
				<img src={require('./job.png')} alt=""/>
			</div>
		)
	}
}

export default Logo
