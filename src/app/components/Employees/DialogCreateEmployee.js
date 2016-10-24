import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MenuItem from 'material-ui/MenuItem'
import {red500} from 'material-ui/styles/colors'
import STR from '../../strings'
import client from '../../client'

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  commonError: {
    color: red500,
    textAlign: 'center',
    marginBottom: 0
  }
}

class DialogCreateEmployee extends React.Component {
  state = {
    open: false,
    firstname: '',
    lastname: '',
    login: '',
    role: null,
    firstnameError: '',
    lastnameError: '',
    loginError: '',
    commonError: ''
  }

  handleOpen = () =>
    this.setState({
      open: true,
      firstname: '',
      lastname: '',
      login: '',
      role: null,
      firstnameError: '',
      lastnameError: '',
      loginError: '',
      roleError: '',
      commonError: ''
    })

  handleClose = () => this.setState({open: false})

  handleFirstnameChange = (e) => this.setState({firstname: e.target.value})

  handleLastnameChange = (e) => this.setState({lastname: e.target.value})

  handleLoginChange = (e) => this.setState({login: e.target.value})

  handleRoleChange = (event, index, value) => this.setState({role: value})

  handleKeyPress = (e) => { if (e.key === 'Enter') this.attemptCreateUser() }

  attemptCreateUser = () => {
    this.setState({ firstnameError: '', lastnameError: '', loginError: '', roleError: '', commonError: ''})

    var firstname = this.state.firstname.trim()
    var lastname = this.state.lastname.trim()
    var login = this.state.login.trim()
    var role = this.state.role

    var focusField
    if (role === null) {
      this.setState({ roleError: STR.error_required })
      focusField = this.refs.role
    }
    if (login === '') {
      this.setState({ loginError: STR.error_required })
      focusField = this.refs.login
    } else if (!/^[a-zA-Z]+$/.test(login)) {
      this.setState({ loginError: STR.error_latin_letters_only })
      focusField = this.refs.login
    }
    if (lastname === '') {
      this.setState({ lastnameError: STR.error_required })
      focusField = this.refs.lastname
    }
    if (firstname === '') {
      this.setState({ firstnameError: STR.error_required })
      focusField = this.refs.firstname
    }

    if (focusField) {
      if (focusField instanceof TextField) {
        focusField.focus()
      }
    } else {
      this.createUser({
        firstname: firstname,
        lastname: lastname,
        username: login,
        password: login,
        role: role
      })
    }
  }

  createUser = (user) =>
    client({method: 'POST',
      path: 'http://localhost:8080/users',
      headers: {'Content-Type': 'application/json'},
      entity: user,
      username: window.localStorage.getItem('login'),
      password: window.localStorage.getItem('password'),
    }).then(response => {
        this.handleClose()
        this.props.onCreate()
      }, errorResponse => {
        if (errorResponse.status.code == 400) {
          var error = errorResponse.entity.errors[0]
          if (error.property === 'username' && error.message === 'must be unique') {
            this.setState({ loginError: STR.error_login_conflict})
          }
        } else if (errorResponse.status.code == 0) {
          this.setState({commonError: STR.error_server_unavailable})
        }
      }
    )

  render() {
    const actions = [
      <FlatButton
        label={STR.action_cancel}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={STR.action_save}
        primary={true}
        onTouchTap={this.attemptCreateUser}
      />,
    ]

    return (
      <div>
        <FloatingActionButton
          secondary={true} style={styles.fab} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={STR.title_new_employee}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: 304}}
          autoScrollBodyContent={true}>
          <div>
            <TextField
              ref="firstname"
              floatingLabelText={STR.label_firstname}
              value={this.state.firstname}
              onChange={this.handleFirstnameChange}
              errorText={this.state.firstnameError}
              onKeyPress={this.handleKeyPress}
              autoFocus />
          </div>
          <div>
            <TextField
              ref="lastname"
              floatingLabelText={STR.label_lastname}
              value={this.state.lastname}
              onChange={this.handleLastnameChange}
              errorText={this.state.lastnameError}
              onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <TextField
              ref="login"
              floatingLabelText={STR.label_username}
              value={this.state.login}
              onChange={this.handleLoginChange}
              errorText={this.state.loginError}
              onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <SelectField
              ref="role"
              floatingLabelText={STR.label_role}
              errorText={this.state.roleError}
              value={this.state.role}
              onChange={this.handleRoleChange} >
              <MenuItem key={1} value="MANAGER" primaryText="Менеджер" />
              <MenuItem key={2} value="EMPLOYEE" primaryText="Сотрудник" />
            </SelectField>
          </div>
          {
            this.state.commonError !== '' ?
            <div>
              <p style={style.commonError}>{ this.state.commonError }</p>
            </div> : null
          }
        </Dialog>
      </div>
    )
  }
}

export default DialogCreateEmployee
