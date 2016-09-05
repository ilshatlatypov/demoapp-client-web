import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarWithMenu from './AppBarWithMenu';
import DrawerSimpleExample from './DrawerSimpleExample';
import PaperWithList from './PaperWithList';

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
          <PaperWithList />
        </div>
      </MuiThemeProvider>
    )
  }
};

export default NewMain;