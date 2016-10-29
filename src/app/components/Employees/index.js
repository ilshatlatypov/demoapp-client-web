import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../../ToolbarExamplesSimple'

import Paper from 'material-ui/Paper'
import {List} from 'material-ui/List'
import Employee from './Employee'
import CircularProgress from 'material-ui/CircularProgress'
import {red500} from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import DialogCreateEmployee from './DialogCreateEmployee'
import MySnackbar from './MySnackbar'

import client from '../../client'
import STR from '../../strings'

const username = window.localStorage.getItem('login')
const password = window.localStorage.getItem('password')

const styles = {
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

  getEmployees = () =>
    this.state.employees.map(employee =>
      <Employee key={employee._links.self.href} employee={employee} afterDelete={this.handleDeleted}/>
    )

  handleUserCreated = () => {
    this.notifyAndRefresh(STR.prompt_employee_added)
  }

  handleDeleted = () => {
    this.notifyAndRefresh(STR.prompt_employee_deleted)
  }

  notifyAndRefresh = (message) => {
    this.setState({snackbarMessage: message})
    this.refs.snackbar.handleRequestOpen()
    this.refresh()
  }

  render() {
    var component
    if (!this.state.requestInProgress) {
      component = this.state.employees ?
        <List>{this.getEmployees()}</List> :
        <div style={styles.errorCard}>{STR.error_server_unavailable}</div>
    } else {
      component = <div style={styles.progressCard}><CircularProgress /></div>
    }

    component = <Table fixedHeader={true} multiSelectable={true}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody showRowHover={true}>
        {this.getEmployees()}
      </TableBody>
    </Table>

    return (
      <div>
        <ToolbarExamplesSimple
          title={STR.title_employees}
          onMenuIconButtonTouchTap={this.props.onMenuIconClick}
        />
        <Paper style={styles.employeesCard}>
          {component}
        </Paper>
        <DialogCreateEmployee onCreate={this.handleUserCreated}/>
        <MySnackbar message={this.state.snackbarMessage} ref="snackbar"/>
      </div>
    )
  }
}

export default Employees
