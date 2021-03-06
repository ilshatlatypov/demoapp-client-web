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

export default class Employee extends React.Component {
  state = {displayActions: false}

  handleMouseEnter = () => this.setState({displayActions: true})

  handleMouseLeave = () => this.setState({displayActions: false})

  askForDeleteConfirmation = () => this.refs.dialogConfirmDelete.handleOpen()

  handleAfterDelete = () => this.props.afterDelete()

  stopPropagation = (e) => e.stopPropagation()

  render() {
    const {employee, afterDelete, onEdit, ...otherProps} = this.props

    return (
      <PureTableRow {...otherProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {otherProps.children[0]}
        <TableRowColumn>
          {employee.firstname + " " + employee.lastname}
        </TableRowColumn>
        <TableRowColumn style={styles.actionsColumn}>
          {
            this.state.displayActions ?
            <div>
              <IconButton
                iconStyle={styles.actionIcons}
                onClick={this.stopPropagation}
                onTouchTap={() => this.props.onEdit(employee)}>
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
          toDelete={employee}
          message={STR.prompt_delete_employee}
          afterDelete={this.handleAfterDelete}
          ref="dialogConfirmDelete"
        />
      </PureTableRow>
    )
  }
}
