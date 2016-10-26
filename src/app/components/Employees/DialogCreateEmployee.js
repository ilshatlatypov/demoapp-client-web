import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import {red500} from 'material-ui/styles/colors'
import STR from '../../strings'
import client from '../../client'

const progressDiameter = 40

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  content: {
    width: 304
  },
  commonError: {
    color: red500,
    textAlign: 'center',
    marginBottom: 0
  },
  progress: {
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
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
    commonError: '',
    requestInProgress: false,
    progressPaddingsAreSet: false
  }

  handleOpen = () => {
    this.clearFields()
    this.clearErrors()
    this.setState({
      open: true,
      requestInProgress: false,
      progressPaddingsAreSet: false
    })
  }

  clearFields = () =>
    this.setState({
      firstname: '',
      lastname: '',
      login: '',
      role: null,
    })

  clearErrors = () =>
    this.setState({
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
    if (!this.state.progressPaddingsAreSet) {
      this.setPaddingsForProgress()
    }

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
    this.forceUpdate()

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

  createUser = (user) => {
    this.setState({requestInProgress: true})
    client({method: 'POST',
      path: 'http://localhost:8080/users',
      headers: {'Content-Type': 'application/json'},
      entity: user,
      username: window.localStorage.getItem('login'),
      password: window.localStorage.getItem('password')
    }).then(response => {
        this.handleClose()
        this.props.onCreate()
      }, errorResponse => {
        if (errorResponse.status.code == 400) {
          var error = errorResponse.entity.errors[0]
          if (error.property === 'username' && error.message === 'must be unique') {
            this.setState({loginError: STR.error_login_conflict})
          }
        } else if (errorResponse.status.code == 0) {
          this.setState({commonError: STR.error_server_unavailable})
        }
        this.setState({requestInProgress: false})
      }
    )
  }

  setPaddingsForProgress = () => {
    // get dialog by className because id cannot be applied (bug in material ui)
    var dialog = document.getElementsByClassName("dialogCreateEmployee")[0]
    var progressPaddingHor = (dialog.clientWidth - progressDiameter) / 2
    var progressPaddingVert = (dialog.clientHeight - progressDiameter) / 2

    styles.progress.paddingLeft = progressPaddingHor
    styles.progress.paddingRight = progressPaddingHor
    styles.progress.paddingTop = progressPaddingVert
    styles.progress.paddingBottom = progressPaddingVert

    this.state.progressPaddingsAreSet = true
  }

  render() {
    const actions = [
      <FlatButton
        label={STR.action_cancel}
        primary={true}
        onTouchTap={this.handleClose}
        disabled={this.state.requestInProgress}
      />,
      <FlatButton
        label={STR.action_save}
        primary={true}
        onTouchTap={this.attemptCreateUser}
        disabled={this.state.requestInProgress}
      />,
    ]

    return (
      <div>
        <FloatingActionButton
          secondary={true} style={styles.fab} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          contentClassName="dialogCreateEmployee"
          title={STR.title_new_employee}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={styles.content}
          autoScrollBodyContent={true}>
          { this.state.requestInProgress ? <div style={styles.progress}><CircularProgress size={40}/></div> : null }
          <div>
            <TextField
              ref="firstname"
              floatingLabelText={STR.label_firstname}
              value={this.state.firstname}
              onChange={this.handleFirstnameChange}
              errorText={this.state.firstnameError}
              onKeyPress={this.handleKeyPress}
              disabled={this.state.requestInProgress}
              autoFocus />
          </div>
          <div>
            <TextField
              ref="lastname"
              floatingLabelText={STR.label_lastname}
              value={this.state.lastname}
              onChange={this.handleLastnameChange}
              errorText={this.state.lastnameError}
              onKeyPress={this.handleKeyPress}
              disabled={this.state.requestInProgress} />
          </div>
          <div>
            <TextField
              ref="login"
              floatingLabelText={STR.label_username}
              value={this.state.login}
              onChange={this.handleLoginChange}
              errorText={this.state.loginError}
              onKeyPress={this.handleKeyPress}
              disabled={this.state.requestInProgress}/>
          </div>
          <div>
            <SelectField
              ref="role"
              floatingLabelText={STR.label_role}
              errorText={this.state.roleError}
              value={this.state.role}
              onChange={this.handleRoleChange}
              disabled={this.state.requestInProgress}>
              <MenuItem key={1} value="MANAGER" primaryText="Менеджер" />
              <MenuItem key={2} value="EMPLOYEE" primaryText="Сотрудник" />
            </SelectField>
          </div>
          { this.state.commonError ? <div style={styles.commonError}>{this.state.commonError}</div> : null }
        </Dialog>
      </div>
    )
  }
}

export default DialogCreateEmployee
