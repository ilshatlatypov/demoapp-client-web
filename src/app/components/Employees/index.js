import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../../ToolbarExamplesSimple'

import Paper from 'material-ui/Paper'
import {List} from 'material-ui/List'
import Employee from './Employee'
import CircularProgress from 'material-ui/CircularProgress'
import {red500} from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

import DialogEmployee from './DialogEmployee'
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
  employeesCard: {
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

class Employees extends React.Component {

  constructor() {
    super()
    this.state = {employees: [], requestInProgress: false, snackbarMessage: ''}
  }

  componentDidMount = () => this.refresh()

  refresh = () => {
    this.setState({requestInProgress: true})
    client({
      method: 'GET',
      path: 'http://localhost:8080/users?sort=firstname&sort=lastname',
      username: username,
      password: password,
    }).then(response => {
        this.setState({
          employees: response.entity._embedded.users,
          requestInProgress: false
        })
      }, errorResponse => {
        console.log(errorResponse)
        this.setState({
          employees: null,
          requestInProgress: false
        })
      }
    )
  }

  handleUserSaved = () => {
    this.notifyAndRefresh(STR.prompt_employee_saved)
  }

  handleDeleted = () => {
    this.notifyAndRefresh(STR.prompt_employee_deleted)
  }

  notifyAndRefresh = (message) => {
    this.setState({snackbarMessage: message})
    this.refs.snackbar.handleRequestOpen()
    this.refresh()
  }

  getEmployeesTable = () => {
    return <Table fixedHeader={true} multiSelectable={true}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>{STR.header_employee_name}</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody showRowHover={true}>
        {this.getEmployees()}
      </TableBody>
    </Table>
  }

  getEmployees = () =>
    this.state.employees.map(employee =>
      <Employee
        key={employee._links.self.href}
        employee={employee}
        onEdit={this.handleOnEdit}
        afterDelete={this.handleDeleted}
      />
    )

  handleOnEdit = (employee) => this.refs.dialogCreateEmployee.handleOpen(employee)

  handleOnCreate = () => this.refs.dialogCreateEmployee.handleOpen()

  render() {
    var component
    if (!this.state.requestInProgress) {
      component = this.state.employees ?
        this.getEmployeesTable() :
        <div style={styles.errorCard}>{STR.error_server_unavailable}</div>
    } else {
      component = <div style={styles.progressCard}><CircularProgress /></div>
    }

    return (
      <div>
        <ToolbarExamplesSimple
          title={STR.title_employees}
          onMenuIconButtonTouchTap={this.props.onMenuIconTouchTap}
        />
        <Paper style={styles.employeesCard}>
          {component}
        </Paper>
        <FloatingActionButton
          secondary={true}
          style={styles.fab}
          onTouchTap={this.handleOnCreate}>
          <ContentAdd />
        </FloatingActionButton>
        <DialogEmployee onSave={this.handleUserSaved} ref="dialogCreateEmployee"/>
        <MySnackbar message={this.state.snackbarMessage} ref="snackbar"/>
      </div>
    )
  }
}

export default Employees
