import React, {Component, PropTypes} from 'react'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, MakeSelectable} from 'material-ui/List'

import Divider from 'material-ui/Divider'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import SocialPeople from 'material-ui/svg-icons/social/people'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'

import { Link } from 'react-router'

import STR from './strings'

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

  handleLogout = () => {
    window.localStorage.clear()
    this.handleClose()
  }

  render() {
    return (
      <Drawer
        docked={false}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
      >
        <SelectableList defaultValue={0}>
          <ListItem containerElement={<Link to="/tasks" />} value={0} primaryText={STR.title_tasks} leftIcon={<ContentPaste />} onTouchTap={this.handleClose} />
          <ListItem containerElement={<Link to="/employees" />} value={1} primaryText={STR.title_employees} leftIcon={<SocialPeople />} onTouchTap={this.handleClose} />
        </SelectableList>
        <Divider />
        <List>
          <ListItem containerElement={<Link to="/login" />} primaryText="Выйти" leftIcon={<ActionExitToApp />} onTouchTap={this.handleLogout} />
        </List>
      </Drawer>
    );
  }
}
