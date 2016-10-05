import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarWithMenu from './AppBarWithMenu';
import NavigationDrawer from './NavigationDrawer';

import PaperWithList from './PaperWithList';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress'
import {List, ListItem} from 'material-ui/List';
import client from './client'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

class NewMain extends React.Component {
  constructor() {
    super();
    this.state = { mainComponentName: "tasks" };
  }

  openDrawer = () => this.refs.drawer.handleToggle();

  setMainComponent = (newMainComponentName) => {
    this.setState({ mainComponentName: newMainComponentName});
  }

  render() {
    console.log(this.state.mainComponentName);
    var mainComponent;
    if (this.state.mainComponentName === "tasks") {
      mainComponent = <TaskList />;
    } else if (this.state.mainComponentName === "users") {
      mainComponent = <UserList />;
    }

    return (
      <MuiThemeProvider>
        <div>
          <AppBarWithMenu onLeftIconButtonTouchTap={this.openDrawer} />
          <NavigationDrawer ref="drawer" onItemSelected={this.setMainComponent} />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                {mainComponent}
              </div>
            </div>
          </div>
          <FloatingActionButton secondary={true} style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    )
  }
};

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {users: [], showResults: false};
  }

  componentDidMount = () => 
    client({method: 'GET', path: 'http://localhost:8080/users'}).then(response => {
      this.setState({users: response.entity._embedded.users, showResults: true});
    });

  render() {
      var users = this.state.users.map(user =>
        <ListItem key={user._links.self.href} primaryText={user.firstname + " " + user.lastname} />
      );
      return (
        <Paper>
          { this.state.showResults ? <List>{users}</List> : <CircularProgress/> }
        </Paper>
      )
  }
};

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {tasks: [], contentMode: 0};
  }

  componentDidMount = () => 
    client({method: 'GET', path: 'http://localhost:8080/tasks'}).then(response => {
      this.setState({tasks: response.entity._embedded.tasks, contentMode: 1});
    }, errorResponse => {
      this.setState({tasks: [], contentMode: 2});
    });

  render() {
    var tasks = this.state.tasks.map(task =>
      <ListItem key={task._links.self.href} primaryText={task.title} />
    );
    var component;
    switch(this.state.contentMode) {
      case 0:
        component = <CircularProgress/>;
        break;
      case 1:
        component = <List>{tasks}</List>;
        break;
      case 2:
        component = <div>Ошибка</div>;
        break;
    }
    return (
      <Paper>{component}</Paper>
    )
  }
};

export default NewMain;