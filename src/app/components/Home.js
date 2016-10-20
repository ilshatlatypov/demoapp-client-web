import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'
import NavigationDrawer from '../NavigationDrawer'

class Home extends React.Component {
  
  openDrawer = () => this.refs.drawer.handleToggle()

  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="Home" onMenuIconButtonTouchTap={this.openDrawer}/>
        <NavigationDrawer ref="drawer" />
      </div>
    )
  }
}

export default Home
