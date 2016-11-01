import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import DatePicker from 'material-ui/DatePicker'
import {red500} from 'material-ui/styles/colors'
import STR from '../../strings'
import client from '../../client'

const username = window.localStorage.getItem('login')
const password = window.localStorage.getItem('password')

const progressDiameter = 40

const styles = {
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

class DialogTask extends React.Component {
  state = {
    open: false,
    dialogTitle: STR.title_new_task,
    id: null,
    title: '',
    date: null,
    assignee: null,
    titleError: '',
    dateError: '',
    assigneeError: '',
    commonError: '',
    requestInProgress: false,
    progressPaddingsAreSet: false,
    employees: []
  }

  componentDidMount = () => {
    client({
      method: 'GET',
      path: 'http://localhost:8080/users?sort=firstname&sort=lastname',
      username: username,
      password: password,
    }).then(response => {
        this.setState({employees: response.entity._embedded.users})
      }, errorResponse => {
        console.log(errorResponse)
        this.setState({employees: null})
      }
    )
  }

  handleOpen = (task) => {
    this.clearFields()
    this.clearErrors()
    this.setState({
      open: true,
      requestInProgress: false,
      progressPaddingsAreSet: false
    })
    if (task) {
      this.setState({
        dialogTitle: STR.title_edit_task,
        id: task.id,
        title: task.title,
        date: task.date,
        assignee: task.user
      })
    }
  }

  clearFields = () =>
    this.setState({
      id: null,
      title: '',
      date: null,
      assignee: null,
    })

  clearErrors = () =>
    this.setState({
      titleError: '',
      dateError: '',
      assigneeError: '',
      commonError: ''
    })

  handleClose = () => this.setState({open: false})

  handleTitleChange = (e) => this.setState({title: e.target.value})

  handleDateChange = (event, value) => this.setState({date: value})

  handleAssigneeChange = (event, index, value) => this.setState({assignee: value})

  handleKeyPress = (e) => { if (e.key === 'Enter') this.attemptSaveTask() }

  attemptSaveTask = () => {
    if (!this.state.progressPaddingsAreSet) {
      this.setPaddingsForProgress()
    }

    this.clearErrors()

    var id = this.state.id
    var title = this.state.title.trim()
    var date = this.state.date
    var assignee = this.state.assignee

    var focusField
    if (date == null) {
      this.setState({dateError: STR.error_required})
      focusField = this.refs.date
    }
    if (title === '') {
      this.setState({ titleError: STR.error_required })
      focusField = this.refs.title
    }
    this.forceUpdate()

    if (focusField) {
      if (focusField instanceof TextField) {
        focusField.focus()
      }
    } else {
      var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
      this.saveTask({
        id: id,
        title: title,
        date: formattedDate,
        user: "/" + assignee
      })
    }
  }

  saveTask = (task) => {
    var path = 'http://localhost:8080/tasks'
    var method = 'POST'
    if (task.id) {
      path += '/' + task.id
      method = 'PUT'
    }

    this.setState({requestInProgress: true})
    client({
      method: method,
      path: path,
      headers: {'Content-Type': 'application/json'},
      entity: task,
      username: window.localStorage.getItem('login'),
      password: window.localStorage.getItem('password')
    }).then(response => {
        this.handleClose()
        this.props.onSave()
      }, errorResponse => {
        console.log(errorResponse)
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
    var dialog = document.getElementsByClassName("dialogCreateTask")[0]
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
        onTouchTap={this.attemptSaveTask}
        disabled={this.state.requestInProgress}
      />,
    ]

    var employees = []
    if (this.state.employees) {
      employees = this.state.employees.map(employee =>
        <MenuItem key={employee.id} value={employee.id} primaryText={employee.firstname + ' ' + employee.lastname} />
      )
    }

    return (
      <div>
        <Dialog
          contentClassName="dialogCreateTask"
          title={this.state.dialogTitle}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={styles.content}
          autoScrollBodyContent={true}>
          { this.state.requestInProgress ? <div style={styles.progress}><CircularProgress size={40}/></div> : null }
          <div>
            <TextField
              ref="title"
              floatingLabelText={STR.label_title}
              value={this.state.title}
              onChange={this.handleTitleChange}
              errorText={this.state.titleError}
              onKeyPress={this.handleKeyPress}
              disabled={this.state.requestInProgress}
              autoFocus />
          </div>
          <div>
            <DatePicker
              ref="date"
              floatingLabelText={STR.label_date}
              value={this.state.date}
              onChange={this.handleDateChange}
              minDate={new Date()}
              errorText={this.state.dateError}
              locale="ru" DateTimeFormat={global.Intl.DateTimeFormat}
              cancelLabel={STR.action_cancel}
              disabled={this.state.requestInProgress} />
          </div>
          <div>
            <SelectField
              ref="assignee"
              floatingLabelText={STR.label_assignee}
              errorText={this.state.assigneeError}
              value={this.state.assignee}
              onChange={this.handleAssigneeChange}
              disabled={this.state.requestInProgress}
              maxHeight={300}>
              {employees}
            </SelectField>
          </div>
          { this.state.commonError ? <div style={styles.commonError}>{this.state.commonError}</div> : null }
        </Dialog>
      </div>
    )
  }
}

export default DialogTask
