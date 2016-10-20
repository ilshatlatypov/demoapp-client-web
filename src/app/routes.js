import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Employees from './components/Employees'
import Login from './components/Login'
import NotFound from './components/NotFound'
// import Login from './LoginForm'
// import Employees from './UserList'
// import Tasks from './TaskList'

function checkCredentials(nextState, replace) {
  const login = window.localStorage.getItem('login');
  const password = window.localStorage.getItem('password');
  if (login === null || password === null) {
    replace('/login');
  }
}

export const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} onEnter={checkCredentials} />
    <Route path='/tasks' component={Tasks} onEnter={checkCredentials} />
    <Route path='/employees' component={Employees} onEnter={checkCredentials} />
    <Route path='/login' component={Login} />
    <Route path='*' component={NotFound} />
    {/* <Route path='/employees' component={Employees} onEnter={checkCredentials}/>
    <Route path='/tasks' component={Tasks} onEnter={checkCredentials}/>
    <Route path='/login' component={Login} />*/}
  </Route>
)
