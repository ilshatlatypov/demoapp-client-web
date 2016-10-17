import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import STR from './strings';

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
};

export default class DialogCreateTask extends React.Component {
  state = {
    open: false,
    selectedUser: null
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleUserSelectChange = (event, index, value) => this.setState({selectedUser: value});

  render() {
    const actions = [
      <FlatButton
        label={STR.action_cancel}
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
          title={STR.title_new_task}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: 304}}
        >
          <div>
            <TextField floatingLabelText={STR.label_name} ref="title" errorText={this.state.titleError} onKeyPress={this.handleKeyPress} autoFocus/>
          </div>
          <div>
            <DatePicker floatingLabelText={STR.label_date} locale="ru" DateTimeFormat={global.Intl.DateTimeFormat} cancelLabel={STR.action_cancel}/>
          </div>
          <div>
            <SelectField value={this.state.selectedUser} onChange={this.handleUserSelectChange} floatingLabelText={STR.label_employee}>
              <MenuItem key={1} value={1} primaryText="Never" />
              <MenuItem key={2} value={2} primaryText="Every Night" />
              <MenuItem key={3} value={3} primaryText="Weeknights" />
              <MenuItem key={4} value={4} primaryText="Weekends" />
              <MenuItem key={5} value={5} primaryText="Weekly" />
            </SelectField>
          </div>
          { this.state.commonError !== '' ? <div><p style={{ color: red500, textAlign: 'center', marginBottom: 0 }}>{ this.state.commonError }</p></div> : null }
        </Dialog>
      </div>
    );
  }
}