import React from 'react'
import AppBar from 'material-ui/AppBar';

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {red500} from 'material-ui/styles/colors';

import { hashHistory } from 'react-router'

import client from '../client'
import STR from '../strings'

var styles = {
  paper: { marginTop: 24, marginLeft: 'auto', marginRight: 'auto', padding: 24, width: 304 },
  header: { marginTop: 0, marginBottom: 0 }
}

var initialState = { 
  username: '', 
  password: '', 
  usernameError : '', 
  passwordError : '', 
  commonError: '' 
}

class Login extends React.Component {

  constructor() {
    super()
    this.state = { username: '', password: '', usernameError : '', passwordError : '', commonError: '' }
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
      focusField.focus()
    } else {
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
        }
      )
    }
  }

  render() {
    return (
      <div>
        <AppBar title="Login" showMenuIconButton={false}/>
        <Paper style={styles.paper}>
          <h3 style={styles.header}>{STR.title_login}</h3>
          <div>
            <TextField
              floatingLabelText={STR.label_username}
              value={this.state.username}
              errorText={this.state.usernameError}
              onChange={this.handleUsernameChange}
              onKeyPress={this.handleKeyPress}
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
            />
          </div>
        </Paper>
      </div>
    )
  }
}

export default Login
