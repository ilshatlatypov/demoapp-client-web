import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import STR from '../../strings'
import client from '../../client'

const progressDiameter = 40
const dialogWidth = 304

const styles = {
  content: {
    width: dialogWidth
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

export default class DialogConfirmDelete extends React.Component {

  state = {open: false, requestInProgress: false}

  handleOpen = () => this.setState({open: true})

  handleClose = () => this.setState({open: false})

  handleConfirm = () => {
    this.setPaddingsForProgress()
    this.delete(this.props.toDelete)
  }

  setPaddingsForProgress = () => {
    var dialogHeight =
      document.getElementsByClassName("dialogDeleteEmployee")[0].clientHeight
    var progressPaddingHor = (dialogWidth - progressDiameter) / 2
    var progressPaddingVert = (dialogHeight - progressDiameter) / 2

    styles.progress.paddingLeft = progressPaddingHor
    styles.progress.paddingRight = progressPaddingHor
    styles.progress.paddingTop = progressPaddingVert
    styles.progress.paddingBottom = progressPaddingVert
  }

  delete = (objectToDelete) => {
    this.setState({requestInProgress: true})
  	client({
      method: 'DELETE',
      path: objectToDelete._links.self.href,
      username: window.localStorage.getItem('login'),
      password: window.localStorage.getItem('password')
    }).then(response => {
      this.handleClose()
      this.props.afterDelete()
  	})
  }

  render() {
    const actions = [
      <FlatButton
        label={STR.action_cancel}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={STR.action_ok}
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
    ]

    return (
      <Dialog
        actions={actions}
        open={this.state.open}
        contentStyle={styles.content}
        contentClassName="dialogDeleteEmployee"
      >
        { this.state.requestInProgress ? <div style={styles.progress}><CircularProgress /></div> : null }
        {STR.prompt_delete_employee}
      </Dialog>
    )
  }
}
