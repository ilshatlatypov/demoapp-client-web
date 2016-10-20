import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'
import NavigationDrawer from '../NavigationDrawer'

class Tasks extends React.Component {

  openDrawer = () => this.refs.drawer.handleToggle()
  
  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="Tasks" onMenuIconButtonTouchTap={this.openDrawer}/>
        <NavigationDrawer ref="drawer" />
      </div>
    )
  }
}

export default Tasks
