import React, {PropTypes} from 'react';
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress'
import client from './client';

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

export default TaskList;