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
    this.state = { mainComponentName: "login", username: '', password: ''};
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(muiTheme), 
      username: this.state.username, 
      password: this.state.password
    };
  }

  openDrawer = () => this.refs.drawer.handleToggle();

  setMainComponent = (newMainComponentName) => {
    if (newMainComponentName === "logout") {
      this.performLogout();
    } else {
      this.setState({ mainComponentName: newMainComponentName});
    }
  }

  performLogin = (username, password) => {
    this.setState({ username: username, password: password });
    this.setMainComponent("tasks");
  }

  performLogout = () => {
    this.setState({ username: '', password: '' });
    this.setMainComponent("login");
  }

  render() {
    var title;
    var mainComponent;
    if (this.state.mainComponentName === "login") {
      mainComponent = <LoginForm onLogin={this.performLogin}/>;
      title = "DemoApp"
    } else if (this.state.mainComponentName === "tasks") {
      mainComponent = <TaskList />;
      title = "Задачи";
    } else if (this.state.mainComponentName === "users") {
      title = "Сотрудники";
      mainComponent = <UserList />;
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ToolbarExamplesSimple title={title} onMenuIconButtonTouchTap={this.openDrawer} />
          <NavigationDrawer ref="drawer" onItemSelected={this.setMainComponent} />
          {mainComponent}
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
