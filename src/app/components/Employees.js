import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'

class Employees extends React.Component {

  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="Employees" onMenuIconButtonTouchTap={this.props.onMenuIconClick}/>
      </div>
    )
  }
}

export default Employees
