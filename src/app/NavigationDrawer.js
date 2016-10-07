import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Divider from 'material-ui/Divider';

import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

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
        <SelectableList defaultValue={0}>
          <ListItem value={0} primaryText="Задачи" leftIcon={<ContentPaste />} onTouchTap={() => this.itemSelected("tasks")} />
          <ListItem value={1} primaryText="Сотрудники" leftIcon={<SocialPeople />} onTouchTap={() => this.itemSelected("users")} />
        </SelectableList>
        <Divider />
        <List>
          <ListItem primaryText="Выйти" leftIcon={<ActionExitToApp />} onTouchTap={() => this.itemSelected("logout")} />
        </List>
      </Drawer>
    );
  }
}