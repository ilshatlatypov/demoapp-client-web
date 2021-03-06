import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import client from './client'
import {red500} from 'material-ui/styles/colors';
import STR from './strings';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = { usernameError : '', passwordError : '', commonError: '' };
  }

  attemptLogin = () => {
    this.setState({ usernameError : '', passwordError : '', commonError: '' });

    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();

    var focusField;
    if (password === '') {
      this.setState({ passwordError: STR.error_required });
      focusField = this.refs.password;
    }
    if (username === '') {
      this.setState({ usernameError: STR.error_required });
      focusField = this.refs.username;
    }

    if (focusField) {
      focusField.focus();
    } else {
      client({method: 'GET', path: 'http://localhost:8080/users/search/findByUsername?username=' + username, username: username, password: password, code: 500})
        .then(response => {
          this.props.onLogin(username, password);
        }, errorResponse => {
          if (errorResponse.status.code == 401) {
            this.setState({commonError: STR.error_invalid_credentials});
          } else if (errorResponse.status.code == 0) {
            this.setState({commonError: STR.error_server_unavailable});
          }
        });
    }
  }

  handleKeyPress = (e) => { if (e.key === 'Enter') this.attemptLogin(); }

  render() {
    return (
      <Paper style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto', padding: 24, width: 304 }}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>Вход</h3>
        <div>
          <TextField floatingLabelText={ STR.label_login } ref="username" errorText={this.state.usernameError} onKeyPress={this.handleKeyPress} value="man"/>
        </div>
        <div>
          <TextField floatingLabelText={ STR.label_password } type="password" ref="password" errorText={this.state.passwordError} onKeyPress={this.handleKeyPress} value="man"/>
        </div>
        { this.state.commonError !== '' ? <div><p style={{ color: red500, textAlign: 'center', marginBottom: 0 }}>{ this.state.commonError }</p></div> : null }
        <div style={{ textAlign: 'center' }}>
          <RaisedButton label={ STR.action_login } secondary={true} style={{ marginTop: 24 }} onClick={this.attemptLogin} id="action_login"/>
        </div>
      </Paper>
    )
  }
};
