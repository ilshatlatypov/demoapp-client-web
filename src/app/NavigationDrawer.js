import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

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
          <ListItem primaryText="Задачи" leftIcon={<ContentInbox />} onTouchTap={() => this.itemSelected("tasks")} />
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