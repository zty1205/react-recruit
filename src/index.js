import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import reducers from './reducer'

import 'antd-mobile/dist/antd-mobile.css';
import './index.css';

import Login from './view/Login/login.js'
import Register from './view/Register/register.js'
import GeniusInfo from './view/GeniusInfo/geniusInfo'
import BossInfo from './view/BossInfo/bossInfo'
import Chat from './view/Chat/chat'
import AuthRoute from './component/AuthRoute/authRoute'
import Dashboard from './component/Dashboard/dashboard'
import App from './app'


const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f()
))


ReactDOM.render(
  (
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App></App>
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
