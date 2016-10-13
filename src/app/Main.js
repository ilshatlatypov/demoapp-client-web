import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarWithMenu from './AppBarWithMenu';
import ToolbarExamplesSimple from './ToolbarExamplesSimple';
import NavigationDrawer from './NavigationDrawer';

import PaperWithList from './PaperWithList';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List';
import client from './client'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blueGrey500, blueGrey700,deepOrangeA200
} from 'material-ui/styles/colors';

import LoginForm from './LoginForm';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    accent1Color: deepOrangeA200,
  }
});

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  mainPaper: {
    width: 1200, 
    margin: 24, 
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

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
          <FloatingActionButton secondary={true} style={styles.fab}>
            <ContentAdd />
          </FloatingActionButton>
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

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {users: [], showResults: false};
  }

  componentDidMount = () => 
    client({method: 'GET', path: 'http://localhost:8080/users?sort=firstname&sort=lastname', username: this.context.username, password: this.context.password}).then(response => {
      this.setState({users: response.entity._embedded.users, showResults: true});
    });

  render() {
      var users = this.state.users.map(user =>
        <div key={user._links.self.href}>
          <ListItem primaryText={user.firstname + " " + user.lastname} />
          <Divider />
        </div>
      );
      return (
        <Paper style={styles.mainPaper}>
          { this.state.showResults ? <List>{users}</List> : <CircularProgress/> }
        </Paper>
      )
  }
};

UserList.contextTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {tasks: [], contentMode: 0};
  }

  componentDidMount = () => 
    client({method: 'GET', path: 'http://localhost:8080/tasks?projection=withUser&sort=date', username: this.context.username, password: this.context.password }).then(response => {
      this.setState({tasks: response.entity._embedded.tasks, contentMode: 1});
    }, errorResponse => {
      console.log(errorResponse);
      this.setState({tasks: [], contentMode: 2});
    });

  render() {
    var tasks = this.state.tasks.map(task => {
      var userFullname = (task.user != null ? task.user.firstname + " " + task.user.lastname : "не назначен");
      return (<div key={task._links.self.href} >
        <ListItem 
          primaryText={task.title} 
          secondaryText={"Исполнитель: " + userFullname}/>
        <Divider />
      </div>)
    });
    var component;
    switch(this.state.contentMode) {
      case 0:
        component = <div style={{textAlign:'center'}}><CircularProgress style={{margin: 24}}/></div>;
        break;
      case 1:
        component = <List>{tasks}</List>;
        break;
      case 2:
        component = <div>Ошибка</div>;
        break;
    }
    return (
      <Paper style={styles.mainPaper}>{component}</Paper>
    )
  }
};

TaskList.contextTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default Main;
