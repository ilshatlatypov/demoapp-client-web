import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';
import Login from './LoginForm'
import Employees from './UserList'
import Tasks from './TaskList'
import NotFound from './NotFound'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//render(<Main />, document.getElementById('app'));
render(
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Login} />
      <Route path='employees' component={Employees} />
      <Route path='tasks' component={Tasks} />
      <Route path='login' component={Login} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>,
  document.getElementById('app')
)