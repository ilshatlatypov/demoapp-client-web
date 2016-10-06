import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginForm extends React.Component {
  render() {
    return (
      <Paper style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto', padding: 24, width: 304 }}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>Вход</h3>
        <div>
          <TextField floatingLabelText="Логин"/>
        </div>
        <div>
          <TextField floatingLabelText="Пароль" type="password"/>
        </div>
        <div style={{ textAlign: 'center' }}>
          <RaisedButton label="Войти" secondary={true} style={{ marginTop: 24 }}/>
        </div>
      </Paper>
    )
  }
};