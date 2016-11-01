import React, {PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavigationDrawer from '../NavigationDrawer'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey500, blueGrey700,deepOrangeA200 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    accent1Color: deepOrangeA200,
  }
});

class App extends React.Component {

  openDrawer = () => this.refs.drawer.handleToggle()

  render() {
    const childrenWithMenuIconHandler = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        onMenuIconTouchTap: this.openDrawer
      })
    )

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavigationDrawer ref="drawer" />
          {childrenWithMenuIconHandler}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
