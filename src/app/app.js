import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { routes } from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(<Main />, document.getElementById('app'));
render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
