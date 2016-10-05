import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Divider from 'material-ui/Divider';

import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

export default class NavigationDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  itemSelected = (item) => { 
    this.handleClose();
    this.props.onItemSelected(item);
  }

  render() {
    return (
      <Drawer 
        docked={false} 
        open={this.state.open} 
        onRequestChange={(open) => this.setState({open})}
      >
        <List>
          <ListItem primaryText="Задачи" leftIcon={<ContentPaste />} onTouchTap={() => this.itemSelected("tasks")} />
          <ListItem primaryText="Сотрудники" leftIcon={<SocialPeople />} onTouchTap={() => this.itemSelected("users")} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="Выйти" leftIcon={<ActionExitToApp />} onTouchTap={() => this.itemSelected("exit")} />
        </List>
      </Drawer>
    );
  }
}