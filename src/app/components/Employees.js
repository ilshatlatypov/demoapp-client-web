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
  employeesCard: {
    width: '70%',
    maxWidth: 1200,
    margin: 24,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

class Employees extends React.Component {

  constructor() {
    super()
    this.state = {employees: [], requestInProgress: false}
  }

  componentDidMount = () => {
    this.setState({requestInProgress: true})
    client({
      method: 'GET',
      path: 'http://localhost:8080/users?sort=firstname&sort=lastname',
      username: window.localStorage.getItem('login'),
      password: window.localStorage.getItem('password'),
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

  getEmployeesAsListItems = () =>
    this.state.employees.map(employee => {
      return (<div key={employee._links.self.href} >
        <ListItem primaryText={employee.firstname + " " + employee.lastname} />
        <Divider />
      </div>)
    })

  render() {
    var component
    if (!this.state.requestInProgress) {
      component = this.state.employees ?
        <List>{this.getEmployeesAsListItems()}</List> :
        <div style={{textAlign: 'center', padding: 48, color: red500}}>{STR.error_server_unavailable}</div>
    } else {
      component = <div style={{textAlign: 'center', padding: 48}}><CircularProgress /></div>
    }

    return (
      <div>
        <ToolbarExamplesSimple
          title={STR.title_employees}
          onMenuIconButtonTouchTap={this.props.onMenuIconClick}
        />
        <Paper style={styles.employeesCard}>
          {component}
        </Paper>
      </div>
    )
  }
}

export default Employees
