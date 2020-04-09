import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import reducers from './reducer'

import 'antd-mobile/dist/antd-mobile.css';
import './index.css';

import Login from './view/Login/login.js'
import Register from './view/Register/register.js'
import GeniusInfo from './view/GeniusInfo/geniusInfo'
import BossInfo from './view/BossInfo/bossInfo'
import AuthRoute from './component/AuthRoute/authRoute'



const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f()
))


ReactDOM.render(
  (
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthRoute></AuthRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/bossInfo" component={BossInfo}></Route>
        <Route path="/geniusInfo" component={GeniusInfo}></Route>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
