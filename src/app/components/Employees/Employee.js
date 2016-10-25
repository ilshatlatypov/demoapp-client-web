import React from 'react'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import DialogConfirmDelete from './DialogConfirmDelete'

export default class Employee extends React.Component {
  state = {displayDeleteButton: false}

  handleMouseEnter = () => this.setState({displayDeleteButton: true})

  handleMouseLeave = () => this.setState({displayDeleteButton: false})

  askForDeleteConfirmation = () => this.refs.dialogConfirmDelete.handleOpen()

  handleAfterDelete = () => this.props.afterDelete()

  render() {
    return (<div key={this.props.employee._links.self.href} >
      <ListItem
        primaryText={this.props.employee.firstname + " " + this.props.employee.lastname}
        rightIconButton={
          this.state.displayDeleteButton ?
          <IconButton onTouchTap={this.askForDeleteConfirmation}>
            <ActionDelete />
          </IconButton> : null
        }
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
      <DialogConfirmDelete
        toDelete={this.props.employee}
        afterDelete={this.handleAfterDelete}
        ref="dialogConfirmDelete"
      />
      <Divider />
    </div>)
  }
}
