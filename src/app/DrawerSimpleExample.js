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

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <Drawer 
        docked={false} 
        open={this.state.open} 
        onRequestChange={(open) => this.setState({open})}
      >
        <List>
          <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Starred" leftIcon={<ActionGrade />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} onTouchTap={this.handleClose} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="All mail" rightIcon={<ActionInfo />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Trash" rightIcon={<ActionInfo />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Spam" rightIcon={<ActionInfo />} onTouchTap={this.handleClose} />
          <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} onTouchTap={this.handleClose} />
        </List>
      </Drawer>
    );
  }
}