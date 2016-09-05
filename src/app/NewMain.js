import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import AppBarWithMenu from './AppBarWithMenu';
import DrawerSimpleExample from './DrawerSimpleExample';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class NewMain extends React.Component {
  constructor() {
    super();
  }

  openDrawer = () => this.refs.drawer.handleToggle();

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <AppBarWithMenu onLeftIconButtonTouchTap={this.openDrawer} />
        <DrawerSimpleExample ref="drawer" />
        </div>
      </MuiThemeProvider>
    )
  }
};

export default NewMain;