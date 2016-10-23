import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {red500} from 'material-ui/styles/colors';

import CircularProgress from 'material-ui/CircularProgress'

import client from '../client'
import STR from '../strings'

const styles = {
  tasksCard: {
    width: '70%',
    maxWidth: 1200,
    margin: 24,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  errorCard: {
    textAlign: 'center',
    padding: 48,
    color: red500
  },
  progressCard: {
    textAlign: 'center',
    padding: 48
  }
}

class Tasks extends React.Component {

  constructor() {
    super()
    this.state = {tasks: [], requestInProgress: false}
  }

  componentDidMount = () => {
    this.setState({requestInProgress: true})
    client({
      method: 'GET',
      path: 'http://localhost:8080/tasks?projection=withUser&sort=date',
      username: window.localStorage.getItem('login'),
      password: window.localStorage.getItem('password'),
    }).then(response => {
        this.setState({
          tasks: response.entity._embedded.tasks,
          requestInProgress: false
        })
      }, errorResponse => {
        console.log(errorResponse)
        this.setState({
          tasks: null,
          requestInProgress: false
        })
      }
    )
  }

  getTasksAsListItems = () =>
    this.state.tasks.map(task => {
      var userFullname = (task.user != null ? task.user.firstname + " " + task.user.lastname : "не назначен")
      return (<div key={task._links.self.href} >
        <ListItem
          primaryText={task.title}
          secondaryText={"Исполнитель: " + userFullname}/>
        <Divider />
      </div>)
    })

  render() {
    var component
    if (!this.state.requestInProgress) {
      component = this.state.tasks ?
        <List>{this.getTasksAsListItems()}</List> :
        <div style={styles.errorCard}>{STR.error_server_unavailable}</div>
    } else {
      component = <div style={styles.progressCard}><CircularProgress /></div>
    }

    return (
      <div>
        <ToolbarExamplesSimple
          title={STR.title_tasks}
          onMenuIconButtonTouchTap={this.props.onMenuIconClick}
        />
        <Paper style={styles.tasksCard}>
          {component}
        </Paper>
      </div>
    )
  }
}

export default Tasks
