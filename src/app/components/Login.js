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

var defaultState = { usernameError : '', passwordError : '', commonError: '' }

class Login extends React.Component {
  constructor() {
    super()
    this.state = defaultState
  }

  attemptLogin = () => {
    this.setState(defaultState)

    var username = this.refs.username.getValue()
    var password = this.refs.password.getValue()

    var focusField
    if (password === '') {
      this.setState({ passwordError: STR.error_required })
      focusField = this.refs.password
    }
    if (username === '') {
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

  handleKeyPress = (e) => { if (e.key === 'Enter') this.attemptLogin() }

  render() {
    return (
      <div>
        <AppBar title="Login" showMenuIconButton={false}/>
        <Paper style={styles.paper}>
          <h3 style={styles.header}>{STR.title_login}</h3>
          <div>
            <TextField
              ref="username"
              floatingLabelText={STR.label_login}
              errorText={this.state.usernameError}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div>
            <TextField
              ref="password"
              type="password"
              floatingLabelText={STR.label_password}
              errorText={this.state.passwordError}
              onKeyPress={this.handleKeyPress}
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
