import React from 'react'
import AppBar from 'material-ui/AppBar';

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';
import {red500} from 'material-ui/styles/colors';

import { hashHistory } from 'react-router'

import client from '../client'
import STR from '../strings'

const progressDiameter = 70
const loginCardPadding = 24
const loginCardWidth = 256 + loginCardPadding * 2

var styles = {
  loginCard: { marginTop: 24, marginLeft: 'auto', marginRight: 'auto', padding: loginCardPadding, width: loginCardWidth, position: 'relative' },
  header: { marginTop: 0, marginBottom: 0 },
  progress: { zIndex: 2, backgroundColor: 'rgba(255,255,255,0.5)', position: 'absolute' }
}

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      usernameError : '',
      passwordError : '',
      commonError: '',
      requestInProgress: false,
      progressPaddingHor: 0,
      progressPaddingVert: 0
    }
  }

  handleUsernameChange = (e) => this.setState({username: e.target.value})

  handlePasswordChange = (e) => this.setState({password: e.target.value})

  handleKeyPress = (e) => { if (e.key === 'Enter') this.attemptLogin() }

  clearErrors = () => this.setState({ usernameError : '', passwordError : '', commonError: '' })

  attemptLogin = () => {
    this.clearErrors()

    var username = this.state.username.trim()
    var password = this.state.password.trim()

    var focusField
    if (!password) {
      this.setState({ passwordError: STR.error_required })
      focusField = this.refs.password
    }
    if (!username) {
      this.setState({ usernameError: STR.error_required })
      focusField = this.refs.username
    }

    if (focusField) {
      //focusField.focus()
    } else {
      this.setState({requestInProgress: true})
      client({
        method: 'GET',
        path: 'http://localhost:8080/users/search/findByUsername?username=' + username,
        username: username,
        password: password
      }).then(response => {
          window.localStorage.setItem('login', username)
          window.localStorage.setItem('password', password)
          hashHistory.push(`/`)
        }, errorResponse => {
          var code = errorResponse.status.code
          if (code == 401) {
            this.setState({commonError: STR.error_invalid_credentials})
          } else if (code == 0) {
            this.setState({commonError: STR.error_server_unavailable})
          }
          this.setState({requestInProgress: false})
        }
      )
    }
  }

  componentDidMount = () => {
    var loginCardHeight = document.getElementById('login_card').clientHeight

    var width = loginCardWidth - loginCardPadding * 2
    var height = loginCardHeight - loginCardPadding * 2

    var progressPaddingHor = (width - progressDiameter) / 2
    var progressPaddingVert = (height - progressDiameter) / 2

    this.setState({
      progressPaddingHor: progressPaddingHor,
      progressPaddingVert: progressPaddingVert
    })
  }

  render() {
    styles.progress.paddingLeft = this.state.progressPaddingHor
    styles.progress.paddingRight = this.state.progressPaddingHor
    styles.progress.paddingTop = this.state.progressPaddingVert
    styles.progress.paddingBottom = this.state.progressPaddingVert

    return (
      <div>
        <AppBar title="Login" showMenuIconButton={false}/>
        <Paper style={styles.loginCard} id="login_card">
          { this.state.requestInProgress ? <div style={styles.progress}><CircularProgress /></div> : null }
          <h3 style={styles.header}>{STR.title_login}</h3>
          <div>
            <TextField
              floatingLabelText={STR.label_username}
              value={this.state.username}
              errorText={this.state.usernameError}
              onChange={this.handleUsernameChange}
              onKeyPress={this.handleKeyPress}
              disabled={this.state.requestInProgress}
              ref="username"
            />
          </div>
          <div>
            <TextField
              type="password"
              floatingLabelText={STR.label_password}
              value={this.state.password}
              errorText={this.state.passwordError}
              onChange={this.handlePasswordChange}
              onKeyPress={this.handleKeyPress}
              disabled={this.state.requestInProgress}
              ref="password"
            />
          </div>
          { this.state.commonError !== '' ? <div><p style={{ color: red500, textAlign: 'center', marginBottom: 0 }}>{ this.state.commonError }</p></div> : null }
          <div style={{ textAlign: 'center' }}>
            <RaisedButton
              id="action_login"
              label={ STR.action_login }
              secondary={true}
              style={{ marginTop: 24 }}
              onClick={this.attemptLogin}
              disabled={this.state.requestInProgress}
            />
          </div>
        </Paper>
      </div>
    )
  }
}

export default Login
