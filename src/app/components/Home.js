import React, {PropTypes} from 'react'
import ToolbarExamplesSimple from '../ToolbarExamplesSimple'

class Home extends React.Component {
  
  render() {
    return (
      <div>
        <ToolbarExamplesSimple title="Home" onMenuIconButtonTouchTap={this.props.onMenuIconClick}/>
      </div>
    )
  }
}

export default Home
