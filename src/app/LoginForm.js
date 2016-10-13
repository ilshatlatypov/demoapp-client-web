import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import client from './client'
import {red500} from 'material-ui/styles/colors';

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
      this.setState({ passwordError: "Обязательное поле" });
      focusField = this.refs.password;
    }
    if (username === '') {
      this.setState({ usernameError: "Обязательное поле" });
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
            this.setState({commonError: 'Неправильный логин или пароль'});
          } else if (errorResponse.status.code == 0) {
            this.setState({commonError: 'Сервер временно недоступен'});
          }
        });
    }
  }

  render() {
    return (
      <Paper style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto', padding: 24, width: 304 }}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>Вход</h3>
        <div>
          <TextField floatingLabelText="Логин" ref="username" errorText={this.state.usernameError}/>
        </div>
        <div>
          <TextField floatingLabelText="Пароль" type="password" ref="password" errorText={this.state.passwordError}/>
        </div>
        { this.state.commonError !== '' ? <div><p style={{ color: red500, textAlign: 'center', marginBottom: 0 }}>{ this.state.commonError }</p></div> : null }
        <div style={{ textAlign: 'center' }}>
          <RaisedButton label="Войти" secondary={true} style={{ marginTop: 24 }} onClick={this.attemptLogin} id="action_login"/>
        </div>
      </Paper>
    )
  }
};
