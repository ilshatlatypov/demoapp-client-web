import React from 'react'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import DialogConfirmDelete from './DialogConfirmDelete'
import {TableRowColumn} from 'material-ui/Table'
import PureTableRow from './PureTableRow'
import {grey600} from 'material-ui/styles/colors'

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

  //handleRowHover = ()

  render() {
    const {employee, ...otherProps} = this.props
    delete otherProps.afterDelete

    return (
      <PureTableRow {...otherProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {otherProps.children[0]}
        <TableRowColumn>
          {this.props.employee.firstname + " " + this.props.employee.lastname}
        </TableRowColumn>
        <TableRowColumn style={styles.actionsColumn}>
          {
            this.state.displayActions ?
            <div>
              <IconButton iconStyle={styles.actionIcons}>
                <EditorModeEdit />
              </IconButton>
              <IconButton
                iconStyle={styles.actionIcons}
                onClick={(e) => e.stopPropagation()}
                onTouchTap={this.askForDeleteConfirmation}>
                <ActionDelete />
              </IconButton>
            </div> :
            null
          }
        </TableRowColumn>
        <DialogConfirmDelete
          toDelete={this.props.employee}
          afterDelete={this.handleAfterDelete}
          ref="dialogConfirmDelete"
        />
      </PureTableRow>
    )
  }
}
