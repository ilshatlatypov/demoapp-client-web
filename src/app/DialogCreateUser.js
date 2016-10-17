import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}

export default class DialogCreateUser extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Сохранить"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <FloatingActionButton secondary={true} style={styles.fab} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Новый сотрудник"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: 304}}
        >
          <div>
            <TextField floatingLabelText="Имя" ref="firstname" errorText={this.state.firstnameError} onKeyPress={this.handleKeyPress} autoFocus/>
          </div>
          <div>
            <TextField floatingLabelText="Фамилия" type="lastname" errorText={this.state.lastnameError} onKeyPress={this.handleKeyPress}/>
          </div>
          <div>
            <TextField floatingLabelText="Логин" type="login" errorText={this.state.loginError} onKeyPress={this.handleKeyPress}/>
          </div>
          { this.state.commonError !== '' ? <div><p style={{ color: red500, textAlign: 'center', marginBottom: 0 }}>{ this.state.commonError }</p></div> : null }
        </Dialog>
      </div>
    );
  }
}