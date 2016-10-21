import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'

class NotFound extends React.Component {

  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="NotFound" onMenuIconButtonTouchTap={this.props.onMenuIconClick}/>
      </div>
    )
  }
}

export default NotFound
