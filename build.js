import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Chat from './modules/Chat'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/chatroom/:_id" component={Chat}/>
  </Router>
), document.getElementById('app'))
