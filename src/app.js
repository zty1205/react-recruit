import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './view/Login/login.js'
import Register from './view/Register/register.js'
import GeniusInfo from './view/GeniusInfo/geniusInfo'
import BossInfo from './view/BossInfo/bossInfo'
import AuthRoute from './component/AuthRoute/authRoute'
import Dashboard from './component/Dashboard/dashboard'
import Chat from './view/Chat/chat'


class App extends React.Component {
  render() {
    return (
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact  path="/bossInfo" component={BossInfo}></Route>
          <Route exact path="/geniusInfo" component={GeniusInfo}></Route>
          <Route exact path="/chat/:user" component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}

export default App