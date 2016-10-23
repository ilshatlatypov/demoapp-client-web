import React from 'react'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import DialogConfirmDelete from './DialogConfirmDelete'

export default class Employee extends React.Component {

  askForDeleteConfirmation = () => this.refs.dialogConfirmDelete.handleOpen()

  handleDelete = () => this.props.onDelete(this.props.employee)

  render() {
    return (<div key={this.props.employee._links.self.href} >
      <ListItem
        primaryText={this.props.employee.firstname + " " + this.props.employee.lastname}
        rightIconButton={<IconButton onTouchTap={this.askForDeleteConfirmation}><ActionDelete /></IconButton>}
      />
      <DialogConfirmDelete onConfirm={this.handleDelete} ref="dialogConfirmDelete"/>
      <Divider />
    </div>)
  }
}
