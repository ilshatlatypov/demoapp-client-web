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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    accent1Color: deepOrangeA200,
  }
});

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

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
  }

  openDrawer = () => this.refs.drawer.handleToggle();

  setMainComponent = (newMainComponentName) => {
    this.setState({ mainComponentName: newMainComponentName});
  }

  render() {
    console.log(this.state.mainComponentName);
    var title;
    var mainComponent;
    if (this.state.mainComponentName === "tasks") {
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

// <AppBarWithMenu onLeftIconButtonTouchTap={this.openDrawer} />
// <ToolbarExamplesSimple />

NewMain.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {users: [], showResults: false};
  }

  componentDidMount = () => 
    client({method: 'GET', path: 'http://localhost:8080/users?sort=firstname&sort=lastname'}).then(response => {
      this.setState({users: response.entity._embedded.users, showResults: true});
    });

  render() {
      var users = this.state.users.map(user =>
        <div>
          <ListItem key={user._links.self.href} primaryText={user.firstname + " " + user.lastname} />
          <Divider />
        </div>
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
    client({method: 'GET', path: 'http://localhost:8080/tasks?projection=withUser&sort=date'}).then(response => {
      this.setState({tasks: response.entity._embedded.tasks, contentMode: 1});
    }, errorResponse => {
      this.setState({tasks: [], contentMode: 2});
    });

  render() {
    var tasks = this.state.tasks.map(task => {
      var userFullname = (task.user != null ? task.user.firstname + " " + task.user.lastname : "не назначен");
      return (<div>
        <ListItem key={task._links.self.href} 
          primaryText={task.title} 
          secondaryText={"Исполнитель: " + userFullname}/>
        <Divider />
      </div>)
    });
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
