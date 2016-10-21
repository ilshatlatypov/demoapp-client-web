import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'

class Tasks extends React.Component {
  
  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="Tasks" onMenuIconButtonTouchTap={this.props.onMenuIconClick}/>
      </div>
    )
  }
}

export default Tasks
