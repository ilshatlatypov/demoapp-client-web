import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarWithMenu from './AppBarWithMenu';
import ToolbarExamplesSimple from './ToolbarExamplesSimple';
import NavigationDrawer from './NavigationDrawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blueGrey500, blueGrey700,deepOrangeA200
} from 'material-ui/styles/colors';

import LoginForm from './LoginForm';

import TaskList from './TaskList';
import UserList from './UserList';
import STR from './strings';
import { Link } from 'react-router'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    accent1Color: deepOrangeA200,
  }
});

class Main extends React.Component {
  constructor() {
    super();
    this.state = { mainComponentName: "login", username: 'man', password: 'man'};
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(muiTheme), 
      username: this.state.username, 
      password: this.state.password
    };
  }

  openDrawer = () => this.refs.drawer.handleToggle();

  // performLogin = (username, password) => {
  //   this.setState({ username: username, password: password });
  //   this.setMainComponent("tasks");
  // }

  // performLogout = () => {
  //   this.setState({ username: '', password: '' });
  //   this.setMainComponent("login");
  // }

  render() {
    var title = "DemoApp";

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ToolbarExamplesSimple title={title} onMenuIconButtonTouchTap={this.openDrawer} />
          <NavigationDrawer ref="drawer" />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
};

Main.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
  username: PropTypes.string,
  password: PropTypes.string
};

export default Main;
