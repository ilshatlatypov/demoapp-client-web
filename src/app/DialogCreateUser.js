import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {red500} from 'material-ui/styles/colors';
import STR from './strings';
import client from './client'

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

class DialogCreateUser extends React.Component {
  state = {
    open: false,
    selectedRole: null,
    firstnameError: '',
    lastnameError: '',
    loginError: '',
    commonError: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedRole: null,
      firstnameError: '',
      lastnameError: '',
      loginError: '',
      roleError: '',
      commonError: ''
    });
  };

  handleRoleSelectChange = (event, index, value) => this.setState({selectedRole: value});

  attemptCreateUser = () => {
    this.setState({ firstnameError: '', lastnameError: '', loginError: '', roleError: '', commonError: ''});

    var firstname = this.refs.firstname.getValue();
    var lastname = this.refs.lastname.getValue();
    var login = this.refs.login.getValue();
    var role = this.state.selectedRole;

    var focusField;
    if (role === null) {
      this.setState({ roleError: STR.error_required });
      focusField = this.refs.role;
    }
    if (login === '') {
      this.setState({ loginError: STR.error_required });
      focusField = this.refs.login;
    } else if (!/^[a-zA-Z]+$/.test(login)) {
      this.setState({ loginError: STR.error_latin_letters_only });
      focusField = this.refs.login;
    }
    if (lastname === '') {
      this.setState({ lastnameError: STR.error_required });
      focusField = this.refs.lastname;
    }
    if (firstname === '') {
      this.setState({ firstnameError: STR.error_required });
      focusField = this.refs.firstname;
    }

    if (focusField) {
      focusField.focus();
    } else {
      var newUser = { firstname: firstname, lastname: lastname, username: login, password: login, role: role };

      client({method: 'POST', 
        path: 'http://localhost:8080/users', 
        headers: {'Content-Type': 'application/json'}, 
        entity: newUser, 
        username: this.context.username, 
        password: this.context.password, 
        code: 500
      }).then(response => {
          this.handleClose();
          this.props.onCreate();
        }, errorResponse => {
          if (errorResponse.status.code == 400) {
            var error = errorResponse.entity.errors[0];
            if (error.property === 'username' && error.message === 'must be unique') {
              this.setState({ loginError: STR.error_login_conflict});
            }
          } else if (errorResponse.status.code == 0) {
            this.setState({commonError: STR.error_server_unavailable});
          }
        });
    }
  }

  handleKeyPress = (e) => { if (e.key === 'Enter') this.attemptCreateUser(); }

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
    ];

    return (
      <div>
        <FloatingActionButton secondary={true} style={styles.fab} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={STR.title_new_employee}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: 304}}>
          <div>
            <TextField 
              ref="firstname" 
              floatingLabelText={STR.label_firstname} 
              errorText={this.state.firstnameError} 
              onKeyPress={this.handleKeyPress} 
              autoFocus />
          </div>
          <div>
            <TextField 
              ref="lastname"
              floatingLabelText={STR.label_lastname} 
              errorText={this.state.lastnameError} 
              onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <TextField 
              ref="login"
              floatingLabelText={STR.label_login} 
              errorText={this.state.loginError} 
              onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <SelectField 
              ref="role" 
              floatingLabelText={STR.label_role}
              errorText={this.state.roleError}
              value={this.state.selectedRole}
              onChange={this.handleRoleSelectChange} >
              <MenuItem key={1} value="MANAGER" primaryText="Менеджер" />
              <MenuItem key={2} value="EMPLOYEE" primaryText="Сотрудник" />
            </SelectField>
          </div>
          { this.state.commonError !== '' ? <div><p style={{ color: red500, textAlign: 'center', marginBottom: 0 }}>{ this.state.commonError }</p></div> : null }
        </Dialog>
      </div>
    );
  }
}

DialogCreateUser.contextTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default DialogCreateUser;