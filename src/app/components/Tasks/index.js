import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../../ToolbarExamplesSimple'

import Paper from 'material-ui/Paper'
import {List} from 'material-ui/List'
import Task from './Task'
import CircularProgress from 'material-ui/CircularProgress'
import {red500} from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

import DialogTask from './DialogTask'
import MySnackbar from '../common/MySnackbar'

import client from '../../client'
import STR from '../../strings'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const username = window.localStorage.getItem('login')
const password = window.localStorage.getItem('password')

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
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
    this.state = {tasks: [], requestInProgress: false, snackbarMessage: ''}
  }

  componentDidMount = () => this.refresh()

  refresh = () => {
    this.setState({requestInProgress: true})
    client({
      method: 'GET',
      path: 'http://localhost:8080/tasks?projection=withUser&sort=date',
      username: username,
      password: password,
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

  handleUserSaved = () => {
    this.notifyAndRefresh(STR.prompt_task_saved)
  }

  handleDeleted = () => {
    this.notifyAndRefresh(STR.prompt_task_deleted)
  }

  notifyAndRefresh = (message) => {
    this.setState({snackbarMessage: message})
    this.refs.snackbar.handleRequestOpen()
    this.refresh()
  }

  getTasksTable = () => {
    return <Table fixedHeader={true} multiSelectable={true}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>{STR.header_task_title}</TableHeaderColumn>
          <TableHeaderColumn>{STR.header_task_owner}</TableHeaderColumn>
          <TableHeaderColumn style={{width: 96, paddingLeft: 12, paddingRight: 12}}></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody showRowHover={true}>
        {this.getTasks()}
      </TableBody>
    </Table>
  }

  getTasks = () =>
    this.state.tasks.map(task =>
      <Task
        key={task._links.self.href}
        task={task}
        onEdit={this.handleOnEdit}
        afterDelete={this.handleDeleted}
      />
    )

  handleOnEdit = (employee) => this.refs.dialogTask.handleOpen(employee)

  handleOnCreate = () => this.refs.dialogTask.handleOpen()

  render() {
    var component
    if (!this.state.requestInProgress) {
      component = this.state.tasks ?
        this.getTasksTable() :
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
        <FloatingActionButton
          secondary={true}
          style={styles.fab}
          onTouchTap={this.handleOnCreate}>
          <ContentAdd />
        </FloatingActionButton>
        <DialogTask onSave={this.handleUserSaved} ref="dialogTask"/>
        <MySnackbar message={this.state.snackbarMessage} ref="snackbar"/>
      </div>
    )
  }
}

export default Tasks
