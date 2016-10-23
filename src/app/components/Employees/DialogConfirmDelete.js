import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import STR from '../../strings'

export default class DialogConfirmDelete extends React.Component {

  state = {open: false}

  handleOpen = () => this.setState({open: true})

  handleClose = () => this.setState({open: false})

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
        onTouchTap={this.props.onConfirm}
      />,
    ]

    return (
      <Dialog actions={actions} open={this.state.open} contentStyle={{width: 304}}>
        {STR.prompt_delete_employee}
      </Dialog>
    )
  }
}
