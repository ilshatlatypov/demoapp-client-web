import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'
import NavigationDrawer from '../NavigationDrawer'

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="NotFound"/>
        <NavigationDrawer ref="drawer" />
      </div>
    )
  }
}

export default NotFound
