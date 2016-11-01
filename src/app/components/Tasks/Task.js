import React from 'react'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import {TableRowColumn} from 'material-ui/Table'
import {grey600} from 'material-ui/styles/colors'

import PureTableRow from '../common/PureTableRow'
import DialogConfirmDelete from '../common/DialogConfirmDelete'
import STR from '../../strings'

const styles = {
  actionsColumn: {
    width: 96,
    paddingLeft: 12,
    paddingRight: 12
  },
  actionIcons: {
    color: grey600
  }
}

export default class Task extends React.Component {
  state = {displayActions: false}

  handleMouseEnter = () => this.setState({displayActions: true})

  handleMouseLeave = () => this.setState({displayActions: false})

  askForDeleteConfirmation = () => this.refs.dialogConfirmDelete.handleOpen()

  handleAfterDelete = () => this.props.afterDelete()

  stopPropagation = (e) => e.stopPropagation()

  render() {
    const {task, afterDelete, onEdit, ...otherProps} = this.props
    var owner = task.user
    var ownerFullname
    if (owner) {
      ownerFullname = owner.firstname + ' ' + owner.lastname
    }

    var dateParts = task.date.split("-");
    var date = new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
    var formattedDate = new global.Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}).format(date)

    return (
      <PureTableRow {...otherProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {otherProps.children[0]}
        <TableRowColumn>{task.title}</TableRowColumn>
        <TableRowColumn>{formattedDate}</TableRowColumn>
        <TableRowColumn>{ownerFullname}</TableRowColumn>
        <TableRowColumn style={styles.actionsColumn}>
          {
            this.state.displayActions ?
            <div>
              <IconButton
                iconStyle={styles.actionIcons}
                onClick={this.stopPropagation}
                onTouchTap={() => this.props.onEdit(task)}>
                <EditorModeEdit />
              </IconButton>
              <IconButton
                iconStyle={styles.actionIcons}
                onClick={this.stopPropagation}
                onTouchTap={this.askForDeleteConfirmation}>
                <ActionDelete />
              </IconButton>
            </div> :
            null
          }
        </TableRowColumn>
        <DialogConfirmDelete
          toDelete={task}
          message={STR.prompt_delete_task}
          afterDelete={this.handleAfterDelete}
          ref="dialogConfirmDelete"
        />
      </PureTableRow>
    )
  }
}
