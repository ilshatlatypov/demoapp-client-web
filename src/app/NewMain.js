import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import AppBarWithMenu from './AppBarWithMenu';
import DrawerSimpleExample from './DrawerSimpleExample';

const style = {
  margin: 12,
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
        <MyAwesomeReactComponent style={style} />
        <RaisedButton label="Primary" primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
        <RaisedButton label="Disabled" disabled={true} style={style} />
        <DrawerSimpleExample ref="drawer" />
        </div>
        </MuiThemeProvider>
      )
  }
};

export default NewMain;